defmodule Backend.UserBlocksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.UserBlocks` context.
  """
  alias Backend.AccountsFixtures

  defp valid_attrs(extra \\ %{}) do
    blocker = Map.get(extra, :blocker) || AccountsFixtures.user_fixture()
    blocked = Map.get(extra, :blocked) || AccountsFixtures.user_fixture()

    %{
      blocker_id: blocker.id,
      blocked_id: blocked.id
    }
  end

  @doc """
  Generate a user_block.
  """
  def user_block_fixture(attrs \\ %{}) do
    {:ok, user_block} =
      attrs
      |> valid_attrs()
      |> Backend.UserBlocks.create_user_block()

    user_block
  end
end
