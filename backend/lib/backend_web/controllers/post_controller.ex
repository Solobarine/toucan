defmodule BackendWeb.PostController do
  use BackendWeb, :controller

  alias BackendWeb.Policies.PostsPolicy
  alias Backend.Posts
  alias Backend.Posts.Post
  alias Backend.Guardian

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    posts = Posts.list_posts()
    render(conn, :index, posts: posts)
  end

  def create(conn, %{"post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    merged_params = Map.merge(post_params, %{"user_id" => current_user.id})
    with {:ok, %Post{} = post} <- Posts.create_post(merged_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/posts/#{post}")
      |> render(:show, post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    post = Posts.get_post!(id)
    render(conn, :show, post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Posts.get_post!(id)

    PostsPolicy.update(conn, post)

    with {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
      render(conn, :show, post: post)
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
