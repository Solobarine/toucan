defmodule BackendWeb.FriendshipControllerTest do
  use BackendWeb.ConnCase

  import Backend.FriendshipsFixtures
  import Backend.Guardian

  alias Backend.AccountsFixtures

  setup %{conn: conn} do
    user = AccountsFixtures.user_fixture()
    user2 = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    %{user: user, token: token, user2: user2}
  end

  describe "GET /api/friends – list friend IDs" do
    test "lists user friends", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}") |> get(~p"/api/friends")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "GET /api/friendships/requests – list incoming requests" do
  end

  describe "POST /api/friendships/request – send friend request" do
    test "returns 201 when friend request is created", %{conn: conn, token: token, user2: user2} do
      valid_params = %{"friend_id" => user2.id}

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/friendships/request", friendship: valid_params)

      assert json_response(conn, 201)
    end

    test "returns 401 when Authorization header is missing", %{
      conn: conn,
      user2: user2
    } do
      params = %{"friend_id" => user2.id}

      conn =
        conn
        |> post(~p"/api/friendships/request", friendship: params)

      assert json_response(conn, 401)
    end

    test "returns 422 for non‑integer friend_id", %{conn: conn, token: token} do
      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/friendships/request", friendship: %{"friend_id" => :hello})

      assert json_response(conn, 422)
    end

    test "returns 422 when target user does not exist", %{conn: conn, token: token} do
      params = %{friend_id: 1_000_000_000_000}

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/friendships/request", friendship: params)

      assert json_response(conn, 422)
    end
  end

  describe "PUT /api/friendships/:id/accept – accept request" do
    test "returns 200 and marks friendship as accepted", %{conn: conn, user: user, token: token} do
      user3 = AccountsFixtures.user_fixture()

      %{friendship: friendship} =
        create_friendship(%{user_id: user3.id, friend_id: user.id, status: :pending})

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> put("/api/friendships/#{friendship.id}/accept")

      assert json_response(conn, 200)
    end

    test "returns 403 when non participant tries to accept request", %{
      conn: conn,
      user2: user2,
      token: token
    } do
      participant = AccountsFixtures.user_fixture()

      %{friendship: friendship} =
        create_friendship(%{user_id: user2.id, friend_id: participant.id, status: :pending})

      assert_error_sent 403, fn ->
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> put("/api/friendships/#{friendship.id}/accept")
      end
    end

    test "returns 403 when sender tries to accept request", %{
      conn: conn,
      user: user,
      user2: user2,
      token: token
    } do
      %{friendship: friendship} =
        create_friendship(%{user_id: user.id, friend_id: user2.id, status: :pending})

      assert_error_sent 403, fn ->
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> put("/api/friendships/#{friendship.id}/accept")
      end
    end
  end

  describe "PUT /api/friendships/:id/block – reject request" do
    test "returns 200 and blocks the request", %{conn: conn, user: user, token: token} do
      user3 = AccountsFixtures.user_fixture()

      %{friendship: friendship} =
        create_friendship(%{user_id: user3.id, friend_id: user.id, status: :pending})

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> put("/api/friendships/#{friendship.id}/block")

      assert json_response(conn, 200)
    end

    test "returns 403 when non participant tries to block the friendship", %{
      conn: conn,
      user: user,
      user2: user2,
      token: token
    } do
      participant = AccountsFixtures.user_fixture()

      %{friendship: friendship} =
        create_friendship(%{user_id: user2.id, friend_id: participant.id, status: :pending})

      assert_error_sent 403, fn ->
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> put("/api/friendships/#{friendship.id}/block")
      end
    end
  end

  describe "DELETE /api/friendships/:id – unfriend" do
    test "returns 204 when friendship is deleted by participant", %{
      conn: conn,
      user: user,
      token: token
    } do
      friend = AccountsFixtures.user_fixture()

      %{friendship: friendship} =
        create_friendship(%{user_id: user.id, friend_id: friend.id, status: :accepted})

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> delete("/api/friendships/#{friendship.id}")

      assert response(conn, 204)
    end

    test "returns 403 when non‑participant tries to delete friendship", %{
      conn: conn,
      user: user,
      user2: user2
    } do
      friend = AccountsFixtures.user_fixture()

      %{friendship: friendship} =
        create_friendship(%{user_id: user.id, friend_id: friend.id, status: :accepted})

      {:ok, token, _claims} = encode_and_sign(user2)

      assert_error_sent 403, fn ->
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> delete(~p"/api/friendships/#{friendship.id}")
      end
    end
  end

  defp create_friendship(attrs) do
    friendship = friendship_fixture(attrs)
    %{friendship: friendship}
  end
end
