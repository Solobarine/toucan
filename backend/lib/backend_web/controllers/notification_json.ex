defmodule BackendWeb.NotificationJSON do
  alias Backend.Notifications.Notification

  @doc """
  Renders a list of notifications.
  """
  def index(%{notifications: notifications}) do
    %{data: for(notification <- notifications, do: data(notification))}
  end

  @doc """
  Renders a single notification.
  """
  def show(%{notification: notification}) do
    %{data: data(notification)}
  end

  defp data(%Notification{} = notification) do
    %{
      id: notification.id,
      verb: notification.verb,
      object: notification.object,
      metadata: notification.metadata,
      read_at: notification.read_at
    }
  end
end
