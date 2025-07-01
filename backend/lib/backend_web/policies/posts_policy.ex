defmodule BackendWeb.Policies.PostsPolicy do
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

  def repost(conn, post) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user.id == post.user_id do
      raise ErrorResponse.Forbidden
    else
      conn
    end
  end

  def delete(conn, post) do
    update(conn, post)
  end
end
