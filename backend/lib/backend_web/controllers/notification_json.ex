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
      user_id: notification.user_id,
      actor_id: notification.actor_id,
      actor: notification.actor,
      verb: notification.verb,
      object: notification.object,
      metadata: notification.metadata,
      read_at: notification.read_at,
      inserted_at: notification.inserted_at
    }
  end
end
