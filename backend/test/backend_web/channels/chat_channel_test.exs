defmodule BackendWeb.ChatChannelTest do
  alias BackendWeb.UserSocket
  alias Backend.AccountsFixtures
  alias Backend.Guardian
  alias Backend.Accounts
  use BackendWeb.ChannelCase

  @valid_attrs %{
    first_name: FakerElixir.Name.first_name(),
    last_name: FakerElixir.Name.last_name(),
    username: "example",
    email: "user@example.com",
    password_hash: "password123"
  }

  @attr %{
    first_name: FakerElixir.Name.first_name(),
    last_name: FakerElixir.Name.last_name(),
    username: "another",
    email: "user2@example.com",
    password_hash: "password123"
  }

  setup do
    user = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = Guardian.encode_and_sign(user)
    user2 = AccountsFixtures.user_fixture()
    # IO.inspect(user.id, label: "User ID from Setup")

    {:ok, socket} =
      connect(UserSocket, %{token: token}, connect_info: %{})

    # IO.inspect(socket, label: "Socket")
    # IO.inspect(socket.assigns[:user_id], label: "User from Socket")

    %{socket: socket, user: user, user2: user2, token: token}
  end

  describe "join/3" do
    test "joins the chat successfully when authorized", %{
      socket: socket,
      user: user,
      user2: user2
    } do
      {:ok, _, socket} =
        subscribe_and_join(
          socket,
          "chat:" <>
            Integer.to_string(min(user.id, user2.id)) <>
            "," <> Integer.to_string(max(user.id, user2.id)),
          %{"user_id" => user2.id}
        )

      assert socket.assigns["chats"] != nil
    end

    test "denies joining when unauthorized", %{socket: socket} do
      assert {:error, %{reason: "Unauthorized"}} =
               subscribe_and_join(socket, "chat:3,4", %{})
    end

    test "joins recent chats successfully when authorized", %{socket: socket, user: user} do
      {:ok, _, socket} =
        subscribe_and_join(socket, "chat:recents:" <> Integer.to_string(user.id), %{
          user_id: Integer.to_string(user.id)
        })

      assert socket.assigns["chats"] != nil
    end

    test "denies joining recent chats when unauthorized", %{socket: socket} do
      assert {:error, %{reason: "Unauthorized"}} =
               subscribe_and_join(socket, "chat:recents:1", %{})
    end
  end

  describe "handle_in/3" do
    test "replies with ok for ping event", %{socket: socket, user: user, user2: user2} do
      {:ok, _, socket} =
        subscribe_and_join(
          socket,
          "chat:" <>
            Integer.to_string(min(user.id, user2.id)) <>
            "," <> Integer.to_string(max(user.id, user2.id)),
          %{"user_id" => user2.id}
        )

      ref = push(socket, "ping", %{"message" => "hello"})
      assert_reply ref, :ok, %{"message" => "hello"}
    end

    test "broadcasts the shout event", %{socket: socket, user: user, user2: user2} do
      {:ok, _, socket} =
        subscribe_and_join(
          socket,
          "chat:" <>
            Integer.to_string(min(user.id, user2.id)) <>
            "," <> Integer.to_string(max(user.id, user2.id)),
          %{"user_id" => user2.id}
        )

      push(socket, "shout", %{"message" => "hello world"})
      assert_broadcast "shout", %{"message" => "hello world"}
    end
  end
end
