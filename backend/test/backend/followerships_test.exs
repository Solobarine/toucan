defmodule Backend.FollowershipsTest do
  use Backend.DataCase

  alias Backend.Followerships
  alias Backend.Followerships.Followership

  import Backend.FollowershipsFixtures
  import Backend.AccountsFixtures, only: [user_fixture: 0]

  @invalid_attrs %{follower_id: nil, followee_id: nil}

  describe "list_followerships/0 & get_followership!/1" do
    test "return all followerships and fetch by id" do
      fs = followership_fixture()
      assert Followerships.list_followerships() == [fs]
      assert Followerships.get_followership!(fs.id) == fs
    end
  end

  describe "create_followership/1" do
    test "with valid data persists the record" do
      attrs = valid_attrs()
      assert {:ok, %Followership{} = fs} = Followerships.create_followership(attrs)
      assert fs.follower_id == attrs.follower_id
      assert fs.followee_id == attrs.followee_id
    end

    test "with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} =
               Followerships.create_followership(@invalid_attrs)
    end
  end

  describe "update_followership/2" do
    test "with valid data updates the record" do
      fs = followership_fixture()
      new_followee = user_fixture()

      assert {:ok, %Followership{} = updated} =
               Followerships.update_followership(fs, %{followee_id: new_followee.id})

      assert updated.followee_id == new_followee.id
    end

    test "with invalid data returns error and record is unchanged" do
      fs = followership_fixture()
      assert {:error, _} = Followerships.update_followership(fs, @invalid_attrs)
      assert fs == Followerships.get_followership!(fs.id)
    end
  end

  describe "delete_followership/1" do
    test "removes the record" do
      fs = followership_fixture()
      assert {:ok, %Followership{}} = Followerships.delete_followership(fs)
      assert_raise Ecto.NoResultsError, fn -> Followerships.get_followership!(fs.id) end
    end
  end

  describe "change_followership/2" do
    test "returns a changeset" do
      fs = followership_fixture()
      assert %Ecto.Changeset{} = Followerships.change_followership(fs)
    end
  end

  describe "followers/1" do
    test "returns all users following the given user, preloaded" do
      followee = user_fixture()
      f1 = user_fixture()
      f2 = user_fixture()

      fs1 = followership_fixture(%{follower: f1, followee: followee})
      fs2 = followership_fixture(%{follower: f2, followee: followee})

      followers = Followerships.followers(followee)

      assert Enum.map(followers, & &1.id) |> Enum.sort() ==
               Enum.map([fs1, fs2], & &1.id) |> Enum.sort()

      assert Enum.all?(followers, &Ecto.assoc_loaded?(&1.follower))
    end
  end

  describe "following/1" do
    test "returns all users the given user follows, preloaded" do
      follower = user_fixture()
      fe1 = user_fixture()
      fe2 = user_fixture()

      fs1 = followership_fixture(%{follower: follower, followee: fe1})
      fs2 = followership_fixture(%{follower: follower, followee: fe2})

      following = Followerships.following(follower)

      assert Enum.map(following, & &1.id) |> Enum.sort() ==
               Enum.map([fs1, fs2], & &1.id) |> Enum.sort()

      assert Enum.all?(following, &Ecto.assoc_loaded?(&1.followee))
    end
  end
end
