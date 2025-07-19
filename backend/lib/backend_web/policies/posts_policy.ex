defmodule BackendWeb.Policies.PostsPolicy do
  alias Backend.Accounts.User
  alias Backend.Posts.Post
  alias BackendWeb.ErrorResponse
  alias Backend.Guardian

  def update(conn, post) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user.id == post.user_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  def delete(conn, post) do
    update(conn, post)
  end

  def repost(conn, post) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user.id == post.user_id do
      raise ErrorResponse.Conflict
    else
      conn
    end
  end

  def update_repost(conn, repost, %User{} = user) do
    if repost.user_id == user.id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  def delete_repost(conn, repost, %User{} = user) do
    update_repost(conn, repost, user)
  end
end
