defmodule BackendWeb.FollowershipControllerTest do
  use BackendWeb.ConnCase

  import Backend.FollowershipsFixtures
  import Backend.Guardian

  alias Backend.AccountsFixtures

  @invalid_attrs %{
    follower_id: nil
  }

  setup %{conn: conn} do
    user = AccountsFixtures.user_fixture()
    user2 = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    %{conn: conn, user: user, token: token, user2: user2}
  end

  describe "create followership" do
    test "renders followership when data is valid", %{conn: conn, user2: user2, token: token} do
      params = %{followee_id: user2.id}

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post("/api/followerships", followership: params)

      assert json_response(conn, 201)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, token: token} do
      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/followerships", followership: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "followers" do
    test "list user followers", %{conn: conn, token: token} do
      conn =
        conn
        |> put_req_header("authorization", "bearer #{token}")
        |> get("/api/followerships/followers")

      assert json_response(conn, 200)["followerships"]
    end
  end

  describe "following" do
    test "retrieve followership where user is following", %{conn: conn, token: token} do
      conn =
        conn
        |> put_req_header("authorization", "bearer #{token}")
        |> get("/api/followerships/following")

      assert json_response(conn, 200)["followerships"]
    end
  end

  describe "delete followership" do
    test "deletes chosen followership using followership id", %{
      conn: conn,
      user: user,
      user2: user2,
      token: token
    } do
      %{followership: followership} =
        create_followership(%{follower: user, followee: user2})

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> delete(~p"/api/followerships/#{followership}")

      assert response(conn, 204)
    end

    test "deletes followership using followee id", %{
      conn: conn,
      user: user,
      user2: user2,
      token: token
    } do
      %{followership: followership} =
        create_followership(%{follower: user, followee: user2})

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> delete(~p"/api/followerships?followee_id=#{followership.followee_id}")

      assert json_response(conn, 200) == %{"message" => "Unfollowed user"}
    end
  end

  defp create_followership(attrs) do
    followership = followership_fixture(attrs)
    %{followership: followership}
  end
end
