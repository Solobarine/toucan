defmodule BackendWeb.Policies.NotificationsPolicy do
  alias BackendWeb.ErrorResponse

  def delete(conn, notification, user_id) do
    if (notification.user_id == user_id) do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end
end
