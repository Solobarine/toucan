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
    uploads = post_params["media"] || []

    # Rename each uploaded file to prevent collisions
    media_params =
      Enum.map(uploads, fn %Plug.Upload{} = upload ->
        ext = Path.extname(upload.filename)
        unique_name = "#{Ecto.UUID.generate()}#{ext}"

        %{"file" => %Plug.Upload{upload | filename: unique_name}}
      end)

    merged_params =
      Map.merge(post_params, %{
        "user_id" => current_user.id,
        "media" => media_params
      })

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

    with :ok <- PostsPolicy.show_post(post, current_user) do
      render(conn, :show, post: post, current_user_id: current_user.id || nil)
    end
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    post = Posts.get_post!(id)

    with :ok <- PostsPolicy.update(post, current_user),
         {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
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
    current_user = Guardian.Plug.current_resource(conn)
    post = Posts.get_post!(id)

    with :ok <- PostsPolicy.delete(post, current_user),
         {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end

  def get_repost(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    repost = Posts.get_repost!(id)

    with :ok <- PostsPolicy.show_repost(repost, current_user) do
      json(conn, %{repost: PostJSON.repost_data(repost)})
    end
  end

  def create_repost(conn, %{"repost" => repost_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    params = Map.merge(repost_params, %{"user_id" => current_user.id})

    post = Posts.get_post!(repost_params["original_post_id"])

    with :ok <- PostsPolicy.repost(post, current_user),
         {:ok, %Repost{} = repost} <- Posts.create_repost(params) do
      object = %{id: repost.id, body: repost.body, repost_owner: repost.user_id}

      Notifications.notify_users(current_user.id, repost.user_id,
        verb: "repost",
        object: object,
        metadata: %{}
      )

      conn
      |> put_status(:created)
      |> json(%{message: "Repost created"})
    else
      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid repost request"})
    end
  end

  def update_repost(conn, %{"id" => id, "repost" => repost_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    repost = Posts.get_repost!(id)

    case PostsPolicy.update_repost(repost, current_user) do
      :ok ->
        {:ok, _updated_repost} = Posts.update_repost(repost, repost_params)

        conn
        |> put_status(:ok)
        |> json(%{message: "Repost Updated"})

      {:error, reason} ->
        {:error, reason}
    end
  end

  def delete_repost(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)
    repost = Posts.get_repost!(id)

    case PostsPolicy.delete_repost(repost, current_user) do
      :ok ->
        {:ok, _} = Posts.delete_repost(repost)
        json(conn, %{message: "Repost deleted"})

      {:error, reason} ->
        {:error, reason}
    end
  end
end
