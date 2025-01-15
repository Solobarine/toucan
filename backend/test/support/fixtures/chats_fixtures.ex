defmodule Backend.ChatsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Chats` context.
  """
  alias Backend.AccountsFixtures

  @doc """
  Generate a chat.
  """
  def chat_fixture(attrs \\ %{}) do
    sender = AccountsFixtures.user_fixture()
    receiver = AccountsFixtures.user_fixture()

    name =
      "chat:" <>
        Integer.to_string(min(sender.id, receiver.id)) <>
        "," <> Integer.to_string(max(sender.id, receiver.id))

    {:ok, chat} =
      attrs
      |> Enum.into(%{
        sender_id: sender.id,
        receiver_id: receiver.id,
        name: name,
        message: "some message"
      })
      |> Backend.Chats.create_chat()

    chat
  end
end
