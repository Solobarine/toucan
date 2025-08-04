defmodule Backend.PostsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Posts` context.
  """
  import Backend.AccountsFixtures

  defp valid_attrs(attrs) do
    user_id = Map.get(attrs, :user_id) || user_fixture().id

    %{
      user_id: user_id,
      body: FakerElixir.Lorem.word(),
      title: FakerElixir.Lorem.sentence()
    }
  end

  @doc """
  Generate a post.
  """
  def post_fixture(attrs) do
    {:ok, post} =
      attrs
      |> valid_attrs()
      |> Backend.Posts.create_post()

    post
  end

  def post_fixture do
    user = user_fixture()

    {:ok, post} =
      %{
        body: FakerElixir.Lorem.word(),
        title: FakerElixir.Lorem.sentence(),
        user_id: user.id
      }
      |> Backend.Posts.create_post()

    post
  end
end
