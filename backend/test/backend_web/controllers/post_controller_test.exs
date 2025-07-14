defmodule BackendWeb.PostControllerTest do
  use BackendWeb.ConnCase, async: true
  alias Backend.AccountsFixtures
  alias Backend.Posts
  import Backend.Guardian

  @valid_attrs %{title: "A Post Title", body: "A Post Body"}

  setup do
    # Assume you have a factory for users and posts
    user = AccountsFixtures.user_fixture()
    user2 = AccountsFixtures.user_fixture()
    {:ok, token, _claims} = encode_and_sign(user)
    %{user: user, token: token, user2: user2}
  end

  describe "index/2" do
    test "lists all posts", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = get(conn, ~p"/api/posts")

      assert json_response(conn, 200)["posts"]
    end
  end

  describe "user_posts" do
    test "list user posts", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = get(conn, ~p"/api/user-posts")

      assert json_response(conn, 200)["posts"]
    end

    test "list user posts for a different user", %{conn: conn, user2: user2, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = get(conn, "/api/user-posts?id=#{user2.id}")
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
    test "shows the chosen post", %{conn: conn, user: user, token: token} do
      params = Map.merge(@valid_attrs, %{user_id: user.id})
      {:ok, post} = Posts.create_post(params)

      conn = conn |> put_req_header("authorization", "Bearer #{token}")

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

  describe "create_repost" do
    test "creates a repost for a post", %{conn: conn, user: user, user2: user2, token: token} do
      params = Map.merge(@valid_attrs, %{user_id: user2.id})
      {:ok, post} = Posts.create_post(params)

      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      data = %{original_post_id: post.id, body: "A very detailed post"}

      conn = post(conn, ~p"/api/posts/repost", repost: data)

      assert response(conn, 201)
    end

    test "user cannot create a repost if post belongs to user", %{
      conn: conn,
      user: user,
      token: token
    } do
      params = Map.merge(@valid_attrs, %{user_id: user.id})
      {:ok, post} = Posts.create_post(params)

      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      data = %{original_post_id: post.id, body: "A very detailed post"}

      conn = post(conn, ~p"/api/posts/repost", repost: data)

      assert response(conn, 409)
    end
  end
end
