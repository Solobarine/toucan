defmodule BackendWeb.NotificationController do
  use BackendWeb, :controller

  alias Backend.Notifications
  alias Backend.Notifications.Notification

  action_fallback BackendWeb.FallbackController

  def index(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)
    per = Map.get(params, "per", "25") |> String.to_integer()
    page = Map.get(params, "page", "1") |> String.to_integer()

    notifications = Notifications.list(current_user.id, per: per, page: page)
    render(conn, :index, notifications: notifications)
  end

  def mark_read(conn, %{"id" => id}) do
    {:ok, _} = Notifications.mark_read(id)
    send_resp(conn, :no_content, "")
  end

  def delete(conn, %{"id" => id}) do
    notification = Notifications.get_notification!(id)

    with {:ok, %Notification{}} <- Notifications.delete_notification(notification) do
      send_resp(conn, :no_content, "")
    end
  end
end
