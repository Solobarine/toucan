defmodule BackendWeb.ChatJSON do
  alias BackendWeb.UserJSON
  alias Backend.Accounts
  alias Backend.Chats.Chat

  @doc """
  Renders a list of chats.
  """
  def index(%{chats: chats}) do
    %{chats: for(chat <- chats, do: data(chat))}
  end

  def index_with_user(%{chats: chats}) do
    %{chats: for(chat <- chats, do: data_with_user(chat))}
  end

  @doc """
  Renders a single chat.
  """
  def show(%{chat: chat}) do
    %{chat: data(chat)}
  end

  def data_with_user(%Chat{} = chat) do
    %{
      id: chat.id,
      name: chat.name,
      message: chat.message,
      sender_id: chat.sender_id,
      sender: Accounts.get_user!(chat.sender_id),
      receiver_id: chat.receiver_id,
      receiver: Accounts.get_user!(chat.receiver_id),
      inserted_at: chat.inserted_at,
      updated_at: chat.updated_at
    }
  end

  defp data(%Chat{} = chat) do
    %{
      id: chat.id,
      name: chat.name,
      message: chat.message,
      sender_id: chat.sender_id,
      receiver_id: chat.receiver_id,
      inserted_at: chat.inserted_at,
      updated_at: chat.updated_at
    }
  end
end
