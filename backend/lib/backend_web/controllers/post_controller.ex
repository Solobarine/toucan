defmodule BackendWeb.PostController do
  use BackendWeb, :controller

  require Logger
  alias BackendWeb.PostJSON
  alias Backend.Posts.Repost
  alias Backend.Workers.NotificationWorker
  alias Backend.Notifications
  alias BackendWeb.Policies.PostsPolicy
  alias Backend.Posts
  alias Backend.Posts.Post

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    feed = Posts.list_posts(current_user.id)

    render(conn, :index, posts: feed, current_user_id: current_user.id)
  end

  def create(conn, %{"post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    merged_params = Map.merge(post_params, %{"user_id" => current_user.id})

    with {:ok, %Post{} = post} <- Posts.create_post(merged_params) do
      object = %{id: post.id, body: post.body, post_owner: post.user_id}

      %{
        action: "multiple",
        user_id: current_user.id,
        content_owner_id: nil,
        verb: "post",
        object: object,
        metadata: %{}
      }
      |> NotificationWorker.new()
      |> Oban.insert()

      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/posts/#{post}")
      |> render(:show, post: post, current_user_id: current_user.id || nil)
    end
  end

  def show(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    post = Posts.get_post!(id)
    render(conn, :show, post: post, current_user_id: current_user.id || nil)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    post = Posts.get_post!(id)

    PostsPolicy.update(conn, post)

    with {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
      render(conn, :show, post: post, current_user_id: current_user.id || nil)
    end
  end

  def user_posts(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    user_id = conn.params["user_id"]
    posts = Posts.list_user_posts(user_id || current_user.id)

    render(conn, :index, posts: posts, current_user_id: current_user.id)
  end

  def delete(conn, %{"id" => id}) do
    post = Posts.get_post!(id)

    PostsPolicy.delete(conn, post)

    with {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end

  def get_repost(conn, %{"id" => id}) do
    repost = Posts.get_repost!(id)

    json(conn, %{repost: PostJSON.repost_data(repost)})
  end

  def create_repost(conn, %{"repost" => repost_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    params = Map.merge(repost_params, %{"user_id" => current_user.id})

    post = Posts.get_post!(repost_params["original_post_id"])

    PostsPolicy.repost(conn, post)

    with {:ok, %Repost{} = repost} <- Posts.create_repost(params) do
      object = %{id: repost.id, body: repost.body, repost_owner: repost.user_id}

      Notifications.notify_users(current_user.id, repost.user_id,
        verb: "repost",
        object: object,
        metadata: %{}
      )

      conn
      |> put_status(:created)
      |> json(%{message: "Repost created"})
    end
  end

  def update_repost(conn, %{"id" => id, "repost" => repost_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    repost = Posts.get_repost!(id)

    PostsPolicy.update_repost(conn, repost, current_user)

    with {:ok, _updated_repost} <- Posts.update_repost(repost, repost_params) do
      conn
      |> put_status(:created)
      |> json(%{message: "Repost Updated"})
    end
  end

  def delete_repost(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    repost = Posts.get_repost!(id)

    PostsPolicy.delete_repost(conn, repost, current_user)

    Posts.delete_repost(repost)

    send_resp(conn, :no_content, "")
  end
end
