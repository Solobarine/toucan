defmodule Backend.CommentsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Comments` context.
  """
  import Backend.AccountsFixtures
  import Backend.PostsFixtures

  @doc """
  Generate a comment.
  """
  def comment_fixture(attrs \\ %{}) do
    user = user_fixture()
    post = post_fixture()

    {:ok, comment} =
      attrs
      |> Enum.into(%{
        text: "some text",
        content_id: post.id,
        content_type: "post",
        user_id: user.id
      })
      |> Backend.Comments.create_comment()

    comment
  end

  @doc """
  Generate a Comment for a User
  """
  def user_comment_fixture(user_id) do
    post = post_fixture()

    {:ok, comment} =
      Backend.Comments.create_comment(%{
        text: "a simple comment for user",
        content_id: post.id,
        content_type: "post",
        user_id: user_id
      })

    comment
  end

  @doc """
  Generate a Reply
  """
  def reply_fixture(attr \\ %{}) do
    user = user_fixture()
    sup_comment = comment_fixture()

    {:ok, comment} =
      attr
      |> Enum.into(%{
        text: "a reply to comment",
        content_id: sup_comment.id,
        content_type: "comment",
        user_id: user.id
      })
      |> Backend.Comments.create_comment()

    comment
  end

  @doc """
  Generate a Reply for a User
  """
  def user_comment_fixture(user_id) do
    sup_comment = comment_fixture()

    {:ok, comment} =
      Backend.Comments.create_comment(%{
        text: "a simple comment for user",
        content_id: sup_comment.id,
        content_type: "comment",
        user_id: user_id
      })

    comment
  end
end
