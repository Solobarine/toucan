defmodule BackendWeb.Policies.LikesPolicy do
  alias BackendWeb.ErrorResponse
  alias Backend.Guardian

  def create(conn, like) do
    if like do
      raise ErrorResponse.Conflict
    else
      conn
    end
  end

  def delete(conn, like) do
    current_user = Guardian.Plug.current_resource(conn)

    if !like do
      raise ErrorResponse.NotFound
    end

    if current_user.id == like.user_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end
end
