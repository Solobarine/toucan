defmodule BackendWeb.ChatChannel do
  use BackendWeb, :channel
  alias Backend.Chats

  @impl true
  def join("chat:recents:" <> user_id, _payload, socket) do
    if user_authorized?(user_id, socket.assigns[:user_id]) do
      chats = Chats.recents(socket.assigns[:user_id])
      {:ok, assign(socket, "chats", chats)}
    else
      {:error, %{reason: "Unauthorized"}}
    end
  end

  def join("chat:" <> user_ids, payload, socket) do
    if authorized?(user_ids, socket.assigns[:user_id]) do
      chats = Chats.chat_history(socket.assigns[:user_id], payload["user_id"])
      {:ok, assign(socket, "chats", chats)}
    else
      {:error, %{reason: "Unauthorized"}}
    end
  end

  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  defp user_authorized?(user_id, socket_user_id) do
    user_id == socket_user_id
  end

  defp authorized?(user_ids, user_id) do
    user_ids
    |> String.split(",")
    |> Enum.member?(user_id)
  end
end
