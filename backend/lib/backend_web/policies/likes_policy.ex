defmodule BackendWeb.Policies.LikesPolicy do
  alias BackendWeb.ErrorResponse
  alias Backend.Guardian

  def delete(conn, like) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user.id == like.user_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end
end
