defmodule BackendWeb.ChatChannel do
  use BackendWeb, :channel
  alias BackendWeb.ChatJSON
  alias Backend.Chats

  # Join recent chats channel
  @impl true
  def join("chat:recents:" <> user_id, _payload, socket) do
    if user_authorized?(user_id, socket.assigns[:user_id]) do
      chats = Chats.recents(socket.assigns[:user_id])
      {:ok, ChatJSON.index_with_user(%{chats: chats}), assign(socket, "chats", chats)}
    else
      {:error, %{reason: "Unauthorized"}}
    end
  end

  # Join chat channel e.g chat:3_5
  def join("chat:" <> user_ids, payload, socket) do
    if authorized?(user_ids, socket.assigns[:user_id], payload["user_id"]) do
      chats = Chats.chat_history(socket.assigns[:user_id], payload["user_id"])
      {:ok, ChatJSON.index(%{chats: chats}), assign(socket, "chats", chats)}
    else
      {:error, %{reason: "Unauthorized connection"}}
    end
  end

  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  def handle_in("new_message", payload, socket) do
    current_user_id = String.to_integer(socket.assigns[:user_id])

    name =
      "chats:" <>
        Integer.to_string(min(current_user_id, payload["receiver_id"])) <>
        "," <> Integer.to_string(max(current_user_id, payload["receiver_id"]))

    chat_params = %{
      "message" => payload["message"],
      "sender_id" => current_user_id,
      "receiver_id" => payload["receiver_id"],
      "name" => name
    }

    case Chats.create_chat(chat_params) do
      {:ok, chat} ->
        broadcast(socket, "new_message", ChatJSON.show(%{chat: chat}))

        BackendWeb.Endpoint.broadcast(
          "chat:recents:#{chat.receiver_id}",
          "latest",
          ChatJSON.show(%{chat: chat})
        )

        BackendWeb.Endpoint.broadcast(
          "chat:recents:#{chat.sender_id}",
          "latest",
          ChatJSON.show(%{chat: chat})
        )

      {:error, reason} ->
        broadcast(socket, "new_message", %{error: reason})
    end

    {:noreply, socket}
  end

  def handle_in("latest", payload, socket) do
    broadcast(socket, "latest", payload)
    {:noreply, socket}
  end

  defp user_authorized?(user_id, socket_user_id) do
    user_id == socket_user_id
  end

  defp authorized?(user_ids, user_id, payload_user_id) do
    split_ids =
      user_ids
      |> String.split(",")

    Enum.member?(split_ids, user_id) and Enum.member?(split_ids, payload_user_id) and
      user_id !== payload_user_id
  end
end
