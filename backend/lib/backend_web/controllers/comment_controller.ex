defmodule BackendWeb.CommentController do
  use BackendWeb, :controller

  alias Backend.Workers.NotificationWorker
  alias Backend.Notifications
  alias Backend.Posts
  alias BackendWeb.Policies.CommentsPolicies
  alias Backend.Comments
  alias Backend.Comments.Comment

  action_fallback BackendWeb.FallbackController

  def index(conn, params) do
    content_type = Map.get(params, "content_type", "post")
    id = Map.get(params, "id", "-1")

    comments = Comments.get_comments(id, content_type)

    conn
    |> render(:index, comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    current_user = Guardian.Plug.current_resource(conn)
    post = Posts.get_post!(comment_params["content_id"])

    updated_params =
      Map.merge(comment_params, %{"user_id" => current_user.id, "content_type" => "post"})

    with {:ok, %Comment{} = comment} <- Comments.create_comment(updated_params) do
      # Notify Content Owner
      notification_params = %{
        action: "single",
        user_id: post.user_id,
        actor_id: current_user.id,
        verb: "comment",
        object: %{id: comment_params["content_id"], body: post.body}
      }

      notification_params
      |> NotificationWorker.new()
      |> Oban.insert()

      # Notify close connections
      object = %{id: comment.content_id, body: post.body}

      %{
        action: "multiple",
        user_id: current_user.id,
        content_owner_id: comment.user_id,
        verb: "comment",
        object: object,
        metadata: %{}
      }
      |> NotificationWorker.new()
      |> Oban.insert()

      # Return response
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/comments/#{comment}")
      |> render(:show, comment: comment)
    end
  end

  def create_reply(conn, %{"comment" => comment_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    comment = Comments.get_comment!(comment_params["content_id"])

    updated_params =
      Map.merge(comment_params, %{"user_id" => current_user.id, "content_type" => "comment"})

    with {:ok, %Comment{} = reply} <- Comments.create_comment(updated_params) do
      # Notify Content Owner
      notification_params = %{
        action: "single",
        user_id: reply.user_id,
        actor_id: current_user.id,
        verb: "reply",
        object: %{id: comment.id, text: comment.text}
      }

      # Notifications.notify_user(notification_params)

      notification_params
      |> NotificationWorker.new()
      |> Oban.insert()

      # Notify close connections
      object = %{id: comment.content_id, body: comment.text}

      %{
        action: "multiple",
        user_id: current_user.id,
        content_owner_id: comment.user_id,
        verb: "comment",
        object: object,
        metadata: %{}
      }
      |> NotificationWorker.new()
      |> Oban.insert()

      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/comments/#{comment}")
      |> render(:show, comment: comment)
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    render(conn, :show, comment: comment)
  end

  def update(conn, %{"id" => id, "comment" => comment_params}) do
    comment = Comments.get_comment!(id)

    CommentsPolicies.update(conn, comment)

    with {:ok, %Comment{} = comment} <- Comments.update_comment(comment, comment_params) do
      render(conn, :show, comment: comment)
    end
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)

    CommentsPolicies.delete(conn, comment)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
