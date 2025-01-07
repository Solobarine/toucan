defmodule BackendWeb.ChatControllerTest do
  use BackendWeb.ConnCase

  import Backend.ChatsFixtures

  alias Backend.Guardian
  alias Backend.Chats.Chat

  @create_attrs %{
    receiver_id: 2,
    message: "some message"
  }
  @update_attrs %{
    message: "some updated message"
  }
  @invalid_attrs %{message: nil, receiver_id: 2}

  setup %{conn: conn} do
    user = Backend.AccountsFixtures.user_fixture()
    user2 = Backend.AccountsFixtures.user_fixture()
    receiver = Backend.AccountsFixtures.user_fixture()
    {:ok, token, _claims} = Guardian.encode_and_sign(user)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}

    chat_name =
      "chat:" <>
        Integer.to_string(min(user.id, receiver.id)) <>
        "," <> Integer.to_string(max(user.id, receiver.id))

    %{user: user, user2: user2, token: token, receiver: receiver, chat_name: chat_name}
  end

  describe "index" do
    test "lists all chats", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = get(conn, ~p"/api/chats")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create chat" do
    test "renders chat when data is valid", %{conn: conn, token: token, user2: user2} do
      params = %{
        receiver_id: user2.id,
        message: "some message"
      }

      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = post(conn, ~p"/api/chats", chat: params)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/chats/#{id}")

      assert %{
               "id" => ^id,
               "name" => chat_name
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = post(conn, ~p"/api/chats", chat: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update chat" do
    test "renders chat when data is valid", %{
      conn: conn,
      token: token,
      user: user,
      receiver: receiver,
      chat_name: chat_name
    } do
      chat = chat_fixture(%{sender_id: user.id, receiver_id: receiver.id, name: chat_name})
      id = chat.id

      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = put(conn, ~p"/api/chats/#{id}", chat: @update_attrs)
      assert %{"id" => id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/chats/#{id}")

      assert %{
               "id" => ^id,
               "name" => chat_name
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{
      conn: conn,
      token: token,
      user: user,
      receiver: receiver,
      chat_name: chat_name
    } do
      chat = chat_fixture(%{sender_id: user.id, receiver_id: receiver.id, name: chat_name})
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = put(conn, ~p"/api/chats/#{chat}", chat: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete chat" do
    test "deletes chosen chat", %{
      conn: conn,
      token: token,
      user: user,
      receiver: receiver,
      chat_name: chat_name
    } do
      chat = chat_fixture(%{sender_id: user.id, receiver_id: receiver.id, name: chat_name})
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = delete(conn, ~p"/api/chats/#{chat}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/chats/#{chat}")
      end
    end
  end
end
