defmodule BackendWeb.UserBlocksController do
  use BackendWeb, :controller

  alias BackendWeb.Policies.UserBlocksPolicy
  alias BackendWeb.UserJSON
  alias Backend.UserBlocks

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    blocked_users = UserBlocks.list_user_blocks(current_user.id)

    json(conn, UserJSON.index(blocked_users))
  end

  def create(conn, %{"ban" => params}) do
    current_user = Guardian.Plug.current_resource(conn)

    with {:ok, _blocked} <-
           UserBlocks.create_user_block(Map.merge(params, %{"blocker_id" => current_user.id})) do
      send_resp(conn, :created, "")
    end
  end

  def delete(conn, %{"id" => blocked_user_id}) do
    current_user = Guardian.Plug.current_resource(conn)

    blocked_record = UserBlocks.get_user_block_by_ids(current_user.id, blocked_user_id)

    UserBlocksPolicy.delete(conn, blocked_record, current_user)

    UserBlocks.delete_user_block(blocked_record)

    send_resp(conn, :no_content, "")
  end
end
