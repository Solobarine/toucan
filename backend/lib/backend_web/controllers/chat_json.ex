defmodule BackendWeb.ChatJSON do
  alias Backend.Chats.Chat

  @doc """
  Renders a list of chats.
  """
  def index(%{chats: chats}) do
    %{data: for(chat <- chats, do: data(chat))}
  end

  @doc """
  Renders a single chat.
  """
  def show(%{chat: chat}) do
    %{data: data(chat)}
  end

  defp data(%Chat{} = chat) do
    %{
      id: chat.id,
      name: chat.name,
      message: chat.message,
      sender_id: chat.sender_id,
      receiver_id: chat.receiver_id
    }
  end
end
