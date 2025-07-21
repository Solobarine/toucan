defmodule BackendWeb.Policies.UserBlocksPolicy do
  alias BackendWeb.ErrorResponse

  def delete(conn, user_block, user) do
    if user_block.blocker_id == user.id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end
end
