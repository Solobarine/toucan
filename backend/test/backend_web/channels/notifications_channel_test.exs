defmodule BackendWeb.NotificationsChannelTest do
  use BackendWeb.ChannelCase

  alias Backend.AccountsFixtures

  import Backend.Guardian

  setup do
    user = AccountsFixtures.user_fixture()
    user2 = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    {:ok, socket} =
      BackendWeb.UserSocket
      |> connect(%{token: token}, connect_info: %{})
    %{socket: socket, user: user, user2: user2}
  end

  describe "join" do
    test "joins channel when authorized", %{socket: socket, user: user} do
      {:ok, _, joined_socket} = subscribe_and_join(socket, "notifications:#{user.id}", %{})
      assert joined_socket.topic == "notifications:#{user.id}"
    end

    test "throws error when unauthorized", %{socket: socket, user2: user2} do
      assert {:error, _} = socket |> subscribe_and_join("notifications:#{user2.id}")
    end
  end

  describe "handle_in/3" do
    setup %{socket: socket, user: user} do
      {:ok, _, socket} = subscribe_and_join(socket, "notifications:#{user.id}", %{})
      %{socket: socket}
    end

    test "replies to ping with payload", %{socket: socket} do
      ref = push(socket, "ping", %{"hello" => "world"})
      assert_reply ref, :ok, %{"hello" => "world"}
    end

    test "broadcasts shout message", %{socket: socket} do
      push(socket, "shout", %{"msg" => "Hello world"})
      assert_broadcast "shout", %{"msg" => "Hello world"}
    end
  end
end
