defmodule Backend.ChatsTest do
  use Backend.DataCase

  import Backend.{ChatsFixtures, AccountsFixtures}
  alias Backend.Chats

  describe "chats" do
    alias Backend.Chats.Chat

    @invalid_attrs %{name: nil}

    test "list_chats/0 returns all chats" do
      chat = chat_fixture()
      assert Chats.list_chats() == [chat]
    end

    test "get_chat!/1 returns the chat with given id" do
      chat = chat_fixture()
      assert Chats.get_chat!(chat.id) == chat
    end

    test "create_chat/1 with valid data creates a chat" do
      sender = user_fixture()
      receiver = user_fixture()

      name =
        "chat:" <>
          Integer.to_string(min(sender.id, receiver.id)) <>
          "," <> Integer.to_string(max(sender.id, receiver.id))

      valid_attrs = %{
        sender_id: sender.id,
        receiver_id: receiver.id,
        name: name,
        message: "some message"
      }

      assert {:ok, %Chat{} = chat} = Chats.create_chat(valid_attrs)
      assert chat.name == name
      assert chat.message == "some message"
    end

    test "create_chat/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Chats.create_chat(@invalid_attrs)
    end

    test "update_chat/2 with valid data updates the chat" do
      chat = chat_fixture()
      update_attrs = %{message: "some updated message"}

      assert {:ok, %Chat{} = chat} = Chats.update_chat(chat, update_attrs)
      assert chat.message == "some updated message"
    end

    test "update_chat/2 with invalid data returns error changeset" do
      chat = chat_fixture()
      assert {:error, %Ecto.Changeset{}} = Chats.update_chat(chat, @invalid_attrs)
      assert chat == Chats.get_chat!(chat.id)
    end

    test "delete_chat/1 deletes the chat" do
      chat = chat_fixture()
      assert {:ok, %Chat{}} = Chats.delete_chat(chat)
      assert_raise Ecto.NoResultsError, fn -> Chats.get_chat!(chat.id) end
    end

    test "change_chat/1 returns a chat changeset" do
      chat = chat_fixture()
      assert %Ecto.Changeset{} = Chats.change_chat(chat)
    end
  end
end
