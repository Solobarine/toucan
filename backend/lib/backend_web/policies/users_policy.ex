defmodule BackendWeb.Policies.UsersPolicy do
  alias BackendWeb.ErrorResponse
  alias Backend.UserBlocks

  def show(conn, user_id, current_user_id) do
    if UserBlocks.is_banned(user_id, current_user_id) do
      raise ErrorResponse.NotFound
    else
      conn
    end
  end
end
