defmodule BackendWeb.ReportControllerTest do
  alias Backend.PostsFixtures
  alias Backend.AccountsFixtures
  use BackendWeb.ConnCase, async: true

  import Backend.Guardian

  setup do
    user = AccountsFixtures.user_fixture()
    content = PostsFixtures.post_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    %{user: user, token: token, content: content}
  end

  describe "List Reports" do
    test "returns list of reports", %{conn: conn, token: token} do
      conn =
        conn |> put_req_header("authorization", "Bearer #{token}") |> get(~p"/api/report-content")

      assert json_response(conn, 200)
    end
  end

  describe "Create Report" do
    test "It creates a report with valid params", %{
      conn: conn,
      user: user,
      token: token,
      content: content
    } do
      valid_params = %{
        user_id: user.id,
        content_type: "post",
        content_id: content.id,
        reason: "Hate Speech"
      }

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/report-content", report: valid_params)

      assert json_response(conn, 201)["message"] == "Content Reported Successfully"
    end

    test "User cannot report his/her content", %{conn: conn, user: user, token: token} do
      post = PostsFixtures.post_fixture(%{user_id: user.id})

      valid_params = %{
        user_id: user.id,
        content_type: "post",
        content_id: post.id,
        reason: "Hate Speech"
      }

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/report-content", report: valid_params)

      assert json_response(conn, 422)
    end

    test "Fails to create repost with invalid params", %{conn: conn, token: token} do
      invalid_params = %{
        user_id: "",
        reason: 1,
        content_type: nil,
        content_id: nil
      }

      conn =
        conn
        |> put_req_header("authorization", "Bearer #{token}")
        |> post(~p"/api/report-content", report: invalid_params)

      assert json_response(conn, 422)
    end
  end
end
