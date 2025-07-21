defmodule BackendWeb.Policies.PostsPolicy do
  alias Backend.UserBlocks
  alias Backend.Accounts.User
  alias BackendWeb.ErrorResponse
  alias Backend.Guardian

  def show_post(conn, post, user) do
    if UserBlocks.is_banned(post.user_id, user.id) do
      raise ErrorResponse.NotFound
    else
      conn
    end
  end

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

  def show_repost(conn, repost, user) do
    if UserBlocks.is_banned(repost.original_post.user_id, user.id) do
      raise ErrorResponse.NotFound
    else
      conn
    end
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
