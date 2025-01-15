defmodule BackendWeb.Policies.ChatsPolicy do
  alias Backend.Guardian
  alias BackendWeb.ErrorResponse

  def update(conn, chat) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user.id == chat.sender_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  def delete(conn, chat) do
    update(conn, chat)
  end
end
