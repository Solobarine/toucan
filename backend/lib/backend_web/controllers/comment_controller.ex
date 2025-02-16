defmodule BackendWeb.CommentController do
  use BackendWeb, :controller

  alias BackendWeb.Policies.CommentsPolicies
  alias Backend.Comments
  alias Backend.Comments.Comment

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    comments = Comments.list_comments()
    render(conn, :index, comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    updated_params =
      Map.merge(comment_params, %{"user_id" => current_user.id, "content_type" => "post"})

    with {:ok, %Comment{} = comment} <- Comments.create_comment(updated_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/comments/#{comment}")
      |> render(:show, comment: comment)
    end
  end

  def create_reply(conn, %{"comment" => comment_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    updated_params =
      Map.merge(comment_params, %{"user_id" => current_user.id, "content_type" => "comment"})

    with {:ok, %Comment{} = comment} <- Comments.create_comment(updated_params) do
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
