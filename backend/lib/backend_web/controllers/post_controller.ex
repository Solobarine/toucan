defmodule BackendWeb.PostController do
  use BackendWeb, :controller

  require Logger
  alias BackendWeb.RepostJSON
  alias BackendWeb.Policies.PostsPolicy
  alias Backend.Posts
  alias Backend.Posts.Post
  alias Backend.Guardian

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

  def repost(conn, %{"repost" => repost_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    params = Map.merge(repost_params, %{"user_id" => current_user.id})

    post = Posts.get_post!(repost_params["original_post_id"])

    PostsPolicy.repost(conn, post)

    with {:ok, repost} <- Posts.create_repost(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/posts/repost")
      |> put_view(RepostJSON)
      |> render(:show, repost: repost)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Posts.get_post!(id)

    PostsPolicy.delete(conn, post)

    with {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
