defmodule Backend.LikesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Likes` context.
  """
  alias Backend.AccountsFixtures
  alias Backend.PostsFixtures

  @doc """
  Generate a like.
  """
  def like_fixture(attrs \\ %{}) do
    post = PostsFixtures.post_fixture()
    user = AccountsFixtures.user_fixture()

    {:ok, like} =
      attrs
      |> Enum.into(%{
        user_id: user.id,
        content_id: post.id,
        content_type: "post"
      })
      |> Backend.Likes.create_like()

    like
  end

  def user_like_fixture(user_id) do
    post = PostsFixtures.post_fixture()

    {:ok, like} =
      Backend.Likes.create_like(%{
        user_id: user_id,
        content_id: post.id,
        content_type: "post"
      })

    like
  end
end
