defmodule Backend.PostsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Posts` context.
  """
  alias Backend.AccountsFixtures

  import AccountsFixtures

  @doc """
  Generate a post.
  """
  def post_fixture() do
    user = user_fixture()
    {:ok, post} =
      %{
        body: FakerElixir.Lorem.word,
        title: FakerElixir.Lorem.sentence,
        user_id: user.id
      }
      |> Backend.Posts.create_post()
    post
  end
end
