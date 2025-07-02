defmodule Backend.FollowershipsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Followerships` context.
  """

  alias Backend.{Followerships, Repo}
  alias Backend.AccountsFixtures

  @doc """
  Returns a valid attribute map for building a followership.
  Pass in `%{follower: %User{}, followee: %User{}}` if you want
  to control the pair explicitly.
  """
  def valid_attrs(extra \\ %{}) do
    follower = Map.get(extra, :follower) || AccountsFixtures.user_fixture()
    followee = Map.get(extra, :followee) || AccountsFixtures.user_fixture()

    %{
      follower_id: follower.id,
      followee_id: followee.id
    }
  end

  @doc """
  Creates and returns a persisted `%Followership{}`.
  Accepts the same optional map as `valid_attrs/1`.
  """
  def followership_fixture(attrs \\ %{}) do
    {:ok, followership} =
      attrs
      |> valid_attrs()
      |> Followerships.create_followership()

    Repo.preload(followership, [:follower, :followee])
  end
end
