defmodule BackendWeb.ChatController do
  use BackendWeb, :controller

  alias BackendWeb.ChatJSON
  alias BackendWeb.Policies.ChatsPolicy
  alias Backend.Chats
  alias Backend.Chats.Chat

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    chats = Chats.list_chats()
    render(conn, :index, chats: chats)
  end

  def create(conn, %{"chat" => chat_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    name =
      "chats:" <>
        Integer.to_string(min(current_user.id, chat_params["receiver_id"])) <>
        "," <> Integer.to_string(max(current_user.id, chat_params["receiver_id"]))

    updated_params = Map.merge(chat_params, %{"sender_id" => current_user.id, "name" => name})

    with {:ok, %Chat{} = chat} <- Chats.create_chat(updated_params) do
      BackendWeb.Endpoint.broadcast(name, "shout", %{
        "chat" => ChatJSON.show(%{chat: chat})["chat"]
      })

      BackendWeb.Endpoint.broadcast!(name, "new_message", %{
        "chat" => ChatJSON.show(%{chat: chat})["chat"]
      })

      BackendWeb.Endpoint.broadcast!(
        "chat:recents:" <> Integer.to_string(current_user.id),
        "latest",
        %{
          "chat" => ChatJSON.show(%{chat: chat})["chat"]
        }
      )

      BackendWeb.Endpoint.broadcast!(
        "chat:recents:" <> Integer.to_string(chat_params["receiver_id"]),
        "latest",
        %{
          "chat" => ChatJSON.show(%{chat: chat})["chat"]
        }
      )

      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/chats/#{chat}")
      |> render(:show, chat: chat)
    end
  end

  def show(conn, %{"id" => id}) do
    chat = Chats.get_chat!(id)
    render(conn, :show, chat: chat)
  end

  def update(conn, %{"id" => id, "chat" => chat_params}) do
    chat = Chats.get_chat!(id)

    ChatsPolicy.update(conn, chat)

    with {:ok, %Chat{} = chat} <- Chats.update_chat(chat, chat_params) do
      BackendWeb.Endpoint.broadcast(
        chat.name,
        "chat_updated",
        %{"chat" => chat}
      )

      render(conn, :show, chat: chat)
    end
  end

  def delete(conn, %{"id" => id}) do
    chat = Chats.get_chat!(id)

    ChatsPolicy.delete(conn, chat)

    with {:ok, %Chat{}} <- Chats.delete_chat(chat) do
      send_resp(conn, :no_content, "")
    end
  end
end
