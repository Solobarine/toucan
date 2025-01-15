defmodule Backend.CommentsTest do
  use Backend.DataCase

  alias Backend.Comments

  describe "comments" do
    alias Backend.Comments.Comment

    import Backend.CommentsFixtures
    import Backend.AccountsFixtures
    import Backend.PostsFixtures

    @invalid_attrs %{text: nil, user_id: nil, content_id: nil, content_type: nil}

    test "list_post_comments/1 returns comments" do
      comment = comment_fixture()
      assert Comments.list_post_comments(comment.content_id) == [comment]
    end

    test "list_comment_replies returns comments" do
      reply = reply_fixture()
      assert Comments.list_comment_replies(reply.content_id) == [reply]
    end

    test "list_comments/0 returns all comments" do
      comment = comment_fixture()
      assert Comments.list_comments() == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert Comments.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      user = user_fixture()
      post = post_fixture()

      valid_attrs = %{
        text: "some text",
        user_id: user.id,
        content_id: post.id,
        content_type: "post"
      }

      assert {:ok, %Comment{} = comment} = Comments.create_comment(valid_attrs)
      assert comment.text == "some text"
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Comments.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      comment = comment_fixture()
      update_attrs = %{text: "some updated text"}

      assert {:ok, %Comment{} = comment} = Comments.update_comment(comment, update_attrs)
      assert comment.text == "some updated text"
    end

    test "update_comment/2 with invalid data returns error changeset" do
      comment = comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Comments.update_comment(comment, @invalid_attrs)
      assert comment == Comments.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{}} = Comments.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Comments.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      comment = comment_fixture()
      assert %Ecto.Changeset{} = Comments.change_comment(comment)
    end
  end
end
