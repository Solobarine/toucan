defmodule Backend.FriendshipsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Friendships` context.
  """

  alias Backend.AccountsFixtures

  @doc """
  Generate a friendship.
  """
  def friendship_fixture(attrs) do
    {:ok, friendship} =
      attrs
      |> Backend.Friendships.create_friendship()

    friendship
  end

  def friendship_fixture() do
    user = AccountsFixtures.user_fixture()
    friend = AccountsFixtures.user_fixture()

    params = %{
      user_id: user.id,
      friend_id: friend.id,
      status: :pending
    }

    {:ok, friendship} =
      Backend.Friendships.create_friendship(params)

    {:ok, friendship}
  end
end
