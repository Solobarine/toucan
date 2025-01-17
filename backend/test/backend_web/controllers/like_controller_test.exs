defmodule BackendWeb.LikeControllerTest do
  use BackendWeb.ConnCase

  import Backend.LikesFixtures

  alias Backend.AccountsFixtures
  alias Backend.PostsFixtures
  alias Backend.Likes.Like

  import Backend.Guardian

  @create_attrs %{
    content_id: 42,
    content_type: "some content_type"
  }

  @invalid_attrs %{content_id: nil, content_type: nil}

  setup %{conn: conn} do
    user = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    %{user: user, token: token}
  end

  describe "create like" do
    test "renders like when data is valid", %{conn: conn, token: token} do
      new_post = PostsFixtures.post_fixture()
      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn =
        post(conn, ~p"/api/likes",
          like: Map.merge(@create_attrs, %{content_id: new_post.id, content_type: "post"})
        )

      assert %{"id" => id} = json_response(conn, 201)["like"]
    end

    test "renders errors when data is invalid", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = post(conn, ~p"/api/likes", like: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete like" do
    test "deletes chosen like", %{conn: conn, user: user, token: token} do
      like = user_like_fixture(user.id)
      IO.puts("USer ID: #{user.id}")
      IO.puts("Like User ID: #{like.user_id}")
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = delete(conn, ~p"/api/likes/#{like}")
      assert response(conn, 204)
    end
  end

  defp create_like(_) do
    like = like_fixture()
    %{like: like}
  end
end
