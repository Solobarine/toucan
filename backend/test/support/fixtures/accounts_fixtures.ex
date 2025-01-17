defmodule Backend.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Accounts` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture do
    {:ok, user} =
      %{
        email: FakerElixir.Internet.email(),
        first_name: FakerElixir.Name.first_name(),
        last_name: FakerElixir.Name.last_name(),
        password_hash: "password",
        username: FakerElixir.Lorem.word(),
        tos: true
      }
      |> Backend.Accounts.create_user()

    user
  end
end
