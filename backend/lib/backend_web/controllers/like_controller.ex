defmodule BackendWeb.LikeController do
  use BackendWeb, :controller

  alias Backend.Workers.NotificationWorker
  alias BackendWeb.Policies.LikesPolicy
  alias Backend.Likes
  alias Backend.Likes.Like

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    likes = Likes.list_likes()
    render(conn, :index, likes: likes)
  end

  def create(conn, %{"like" => like_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    like = Likes.get_like(current_user.id, like_params["content_id"], like_params["content_type"])

    LikesPolicy.create(conn, like)
    params = Map.merge(like_params, %{"user_id" => current_user.id})

    with {:ok, %Like{} = like} <- Likes.create_like(params) do
      # Send Notification to Content Owner
      user_notification_params = %{
        action: "single",
        user_id: like.user_id,
        actor_id: current_user.id,
        verb: "like",
        object: %{id: like.content_id, content_type: like.content_type, content_owner: true}
      }

      user_notification_params
      |> NotificationWorker.new()
      |> Oban.insert()

      # Send Notification to close connections
      object = %{id: like.content_id, content_type: like.content_type, content_owner: false}

      %{
        action: "multiple",
        user_id: current_user.id,
        content_owner_id: like.user_id,
        verb: "like",
        object: object,
        metadata: %{}
      }
      |> NotificationWorker.new()
      |> Oban.insert()

      # Return response
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/likes/#{like}")
      |> render(:show, like: like)
    end
  end

  def show(conn, %{"id" => id}) do
    like = Likes.get_like!(id)
    render(conn, :show, like: like)
  end

  def update(conn, %{"id" => id, "like" => like_params}) do
    like = Likes.get_like!(id)

    with {:ok, %Like{} = like} <- Likes.update_like(like, like_params) do
      render(conn, :show, like: like)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Guardian.Plug.current_resource(conn)
    parsed_id = String.to_integer(id)
    like = Likes.get_like(user.id, parsed_id, "post")

    LikesPolicy.delete(conn, like)

    with {:ok, %Like{}} <- Likes.delete_like(like) do
      send_resp(conn, :no_content, "")
    end
  end
end
