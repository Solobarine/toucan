defmodule BackendWeb.NotificationControllerTest do
  use BackendWeb.ConnCase

  import Backend.Guardian
  import Backend.NotificationsFixtures

  alias Backend.AccountsFixtures

  setup %{conn: conn} do
    user = AccountsFixtures.user_fixture()
    user2 = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    %{conn: conn, user: user, token: token, user2: user2}
  end

  describe "index" do
    test "lists all notifications", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}") |> get(~p"/api/notifications")
      assert json_response(conn, 200)["data"] == []
    end
  end 

  describe "delete notification" do
    test "deletes chosen notification", %{conn: conn, user: user, token: token, user2: user2} do
      notification = notification_fixture(%{user_id: user.id, actor_id: user2.id})
      conn = conn |> put_req_header("authorization", "Bearer #{token}") |> delete(~p"/api/notifications/#{notification}")
      assert response(conn, 204) 
    end
  end
end
