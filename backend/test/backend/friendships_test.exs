defmodule Backend.FriendshipsTest do
  use Backend.DataCase

  alias Backend.AccountsFixtures
  alias Backend.Friendships

  describe "friendships" do
    alias Backend.Friendships.Friendship

    import Backend.FriendshipsFixtures

    @invalid_attrs %{status: nil}

    test "list_friendships/0 returns all friendships" do
      {:ok, friendship} = friendship_fixture()
      assert Friendships.list_friendships() == [friendship]
    end

    test "get_friendship!/1 returns the friendship with given id" do
      {:ok, friendship} = friendship_fixture()
      assert Friendships.get_friendship!(friendship.id) == friendship
    end

    test "create_friendship/1 with valid data creates a friendship" do
      user = AccountsFixtures.user_fixture()
      friend = AccountsFixtures.user_fixture()
      valid_attrs = %{user_id: user.id, friend_id: friend.id, status: :pending}

      assert {:ok, %Friendship{} = friendship} = Friendships.create_friendship(valid_attrs)
      assert friendship.status == :pending
    end

    test "create_friendship/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Friendships.create_friendship(@invalid_attrs)
    end

    test "send_friend_request sends friend request" do
      user = AccountsFixtures.user_fixture()
      friend = AccountsFixtures.user_fixture()

      assert {:ok, %Friendship{} = friendship} =
               Friendships.send_friend_request(user.id, friend.id)

      assert friendship.status == :pending
    end

    test "accept_friend_request/1 accept the friend request" do
      user = AccountsFixtures.user_fixture()
      friend = AccountsFixtures.user_fixture()

      {:ok, %Friendship{} = friendship} =
        Friendships.create_friendship(%{user_id: user.id, friend_id: friend.id, status: :pending})

      assert {:ok, friendship} = Friendships.accept_friend_request(friendship)
      assert friendship.status == :accepted
    end

    test "decline_friend_request/1 decline the friend request" do
      user = AccountsFixtures.user_fixture()
      friend = AccountsFixtures.user_fixture()

      {:ok, %Friendship{} = friendship} =
        Friendships.create_friendship(%{user_id: user.id, friend_id: friend.id, status: :pending})

      assert {:ok, friendship} = Friendships.decline_friend_request(friendship)
      assert friendship.status == :blocked
    end

    test "unfriend/1 deletes the friendship" do
      user = AccountsFixtures.user_fixture()
      friend = AccountsFixtures.user_fixture()

      assert :ok = Friendships.unfriend(user, friend)
    end

    test "unfriend/2 deletes the friendship" do
      {:ok, friendship} = friendship_fixture()
      assert {:ok, %Friendship{}} = Friendships.unfriend(friendship)
      assert_raise Ecto.NoResultsError, fn -> Friendships.get_friendship!(friendship.id) end
    end

    test "change_friendship/1 returns a friendship changeset" do
      {:ok, friendship} = friendship_fixture()
      assert %Ecto.Changeset{} = Friendships.change_friendship(friendship)
    end
  end
end
