defmodule BackendWeb.PostControllerTest do
  use BackendWeb.ConnCase, async: true
  alias Backend.AccountsFixtures
  alias Backend.Posts
  import Backend.Guardian

  @valid_attrs %{title: "A Post Title", body: "A Post Body"}

  setup do
    # Assume you have a factory for users and posts
    user = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    %{user: user, token: token}
  end

  describe "index/2" do
    test "lists all posts", %{conn: conn} do
      conn = get(conn, ~p"/api/posts")

      assert json_response(conn, 200)["posts"]
    end
  end

  describe "create/2" do
    test "creates a post when data is valid", %{conn: conn, user: user, token: token} do
      post_params = %{title: "New Post", body: "Content of the post"}

      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn = post(conn, ~p"/api/posts", post: post_params)

      assert %{"id" => id} = json_response(conn, 201)["post"]
      assert Posts.get_post!(id).user_id == user.id
    end
  end

  describe "show/2" do
    test "shows the chosen post", %{conn: conn, user: user} do
      params = Map.merge(@valid_attrs, %{user_id: user.id})
      {:ok, post} = Posts.create_post(params)

      conn = get(conn, ~p"/api/posts/#{post.id}")

      assert json_response(conn, 200)["post"]["id"] == post.id
    end
  end

  describe "update/2" do
    test "updates post when data is valid", %{conn: conn, user: user, token: token} do
      params = Map.merge(@valid_attrs, %{user_id: user.id})
      {:ok, post} = Posts.create_post(params)

      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      updated_params = %{title: "Updated Title", body: "Updated Content"}

      conn = put(conn, ~p"/api/posts/#{post}", post: updated_params)

      # assert %{"id" => post.id, "title" => "Updated Title"} = json_response(conn, 200)["post"]
      assert Posts.get_post!(post.id).title == "Updated Title"
    end
  end

  describe "delete/2" do
    test "deletes the chosen post", %{conn: conn, user: user, token: token} do
      params = Map.merge(@valid_attrs, %{user_id: user.id})
      {:ok, post} = Posts.create_post(params)

      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn = delete(conn, ~p"/api/posts/#{post.id}")
      assert response(conn, 204)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_post!(post.id) end
    end
  end
end
