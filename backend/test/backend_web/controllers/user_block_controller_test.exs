defmodule BackendWeb.UserBlockControllerTest do
  use BackendWeb.ConnCase, async: true
  import Backend.Guardian

  alias Backend.UserBlocks
  alias Backend.UserBlocksFixtures
  alias Backend.AccountsFixtures

  setup do
    # Assume you have a factory for users and posts
    user = AccountsFixtures.user_fixture()
    user2 = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    %{user: user, token: token, user2: user2}
  end

  describe "list blocked users" do
    test "returns list of blocked users", %{conn: conn, token: token} do
      conn =
        conn |> put_req_header("authorization", "Bearer #{token}") |> get(~p"/api/users/blocked")

      assert json_response(conn, 200)["users"]
    end
  end

  describe "blocks a user" do
    test "returns status ok after successful block", %{
      conn: conn,
      user: user,
      token: token,
      user2: user2
    } do
      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/users/block", ban: %{blocked_id: user2.id})

      assert response(conn, 201)
    end

    test "returns error when user blocks self", %{conn: conn, user: user, token: token} do
      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/users/block", ban: %{blocker_id: user.id})

      assert json_response(conn, 422)
    end
  end

  describe "unblocks a user" do
    test "returns status ok after successful unblock", %{
      conn: conn,
      user: user,
      token: token,
      user2: user2
    } do
      UserBlocksFixtures.user_block_fixture(%{blocker: user, blocked: user2})

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> delete(~p"/api/users/#{user2.id}/block")

      assert response(conn, 204)
    end
  end
end
