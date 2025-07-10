defmodule BackendWeb.NotificationsChannel do
  use BackendWeb, :channel

  alias Backend.Notifications

  @impl true
  def join("notifications:"<> user_id, _payload, socket) do
    if authorized?(user_id, socket.assigns[:user_id]) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (notifications:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  # Mark Notification as Read
  def handle_in("mark_read", %{"id" => id}, socket) do
  IO.inspect("Called")
    {:ok, _} = Notifications.mark_read(id)
    IO.inspect("Answered")
    {:no_reply, socket}
  end

  @impl true
  def handle_info({:new_notification, notification}, socket) do
  push(socket, "new_notification", %{
    id: notification.id,
    user_id: notification.user_id,
    actor_id: notification.actor_id,
    verb: notification.verb,
    metadata: notification.metadata,
    read_at: notification.read_at,
    inserted_at: notification.inserted_at
  })

  {:noreply, socket}
end
  # Add authorization logic here as required.
  defp authorized?(user_id, socket_user_id) do
    user_id == socket_user_id
  end
end
