defmodule BackendWeb.CommentControllerTest do
  use BackendWeb.ConnCase, async: true

  alias Backend.AccountsFixtures
  alias Backend.PostsFixtures

  import Backend.CommentsFixtures
  import Backend.Guardian

  @create_attrs %{
    text: "some text"
  }
  @update_attrs %{
    text: "some updated text"
  }
  @invalid_attrs %{:text => nil, :content_id => nil}

  setup %{conn: conn} do
    user = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    %{user: user, token: token}
  end

  describe "index" do
    test "lists all comments", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = get(conn, ~p"/api/comments")
      assert json_response(conn, 200)["comments"] == []
    end
  end

  describe "create comment" do
    test "renders comment when data is valid", %{conn: conn, token: token} do
      post = PostsFixtures.post_fixture()
      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn =
        post(conn, ~p"/api/comments", comment: Map.merge(@create_attrs, %{content_id: post.id}))

      assert %{"id" => id} = json_response(conn, 201)["comment"]

      conn = get(conn, ~p"/api/comments/#{id}")

      assert %{
               "id" => ^id,
               "text" => "some text"
             } = json_response(conn, 200)["comment"]
    end

    test "renders errors when data is invalid", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = post(conn, ~p"/api/comments", comment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update comment" do
    setup [:create_comment]

    test "renders comment when data is valid", %{
      conn: conn,
      token: token,
      user: user
    } do
      comment = user_comment_fixture(user.id)
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = put(conn, ~p"/api/comments/#{comment}", comment: @update_attrs)

      conn = get(conn, ~p"/api/comments/#{comment.id}")

      assert %{
               "text" => "some updated text"
             } = json_response(conn, 200)["comment"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user, token: token} do
      comment = user_comment_fixture(user.id)
      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn = put(conn, ~p"/api/comments/#{comment}", comment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete comment" do
    test "deletes chosen comment", %{conn: conn, user: user, token: token} do
      comment = user_comment_fixture(user.id)
      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn = delete(conn, ~p"/api/comments/#{comment}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/comments/#{comment}")
      end
    end
  end

  defp create_comment(_) do
    comment = comment_fixture()
    %{comment: comment}
  end
end
