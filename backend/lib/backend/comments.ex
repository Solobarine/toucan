defmodule Backend.Comments do
  @moduledoc """
  The Comments context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.Comments.Comment

  @doc """
  Returns the list of comments.

  ## Examples

      iex> list_comments()
      [%Comment{}, ...]

  """
  def list_comments do
    Repo.all(Comment)
  end

  @doc """
  Returns list of comments for a Post
  """
  def list_post_comments(post_id) do
    Comment
    |> where([c], c.content_id == ^post_id and c.content_type == "post")
    |> order_by(desc: :inserted_at)
    |> Repo.all()
    |> preload([:user])
  end

  @doc """
  Returns list of comment replies
  """
  def list_comment_replies(comment_id) do
    Comment
    |> where([c], c.content_id == ^comment_id and c.content_type == "comment")
    |> order_by(desc: :inserted_at)
    |> Repo.all()
    |> preload([:user])
  end

  def count_comments(content_id, content_type) do
    Repo.aggregate(
      from(c in Comment,
        where: c.content_id == ^content_id and c.content_type == ^content_type
      ),
      :count,
      :id
    )
  end

  @doc """
  Gets a single comment.

  Raises `Ecto.NoResultsError` if the Comment does not exist.

  ## Examples

      iex> get_comment!(123)
      %Comment{}

      iex> get_comment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_comment!(id), do: Repo.get!(Comment, id)

  @doc """
  Creates a comment.

  ## Examples

      iex> create_comment(%{field: value})
      {:ok, %Comment{}}

      iex> create_comment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_comment(attrs \\ %{}) do
    case Repo.insert(Comment.changeset(%Comment{}, attrs)) do
      {:ok, comment} ->
        {:ok, Repo.preload(comment, [:user])}

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Get comments for a content type
  """
  def get_comments(id, content_type \\ "post") do
    from(
      c in Comment,
      where: c.content_id == ^id and c.content_type == ^content_type,
      preload: [:user],
      select: c
    )
    |> Repo.all()
  end

  @doc """
  Updates a comment.

  ## Examples

      iex> update_comment(comment, %{field: new_value})
      {:ok, %Comment{}}

      iex> update_comment(comment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_comment(%Comment{} = comment, attrs) do
    comment
    |> Comment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a comment.

  ## Examples

      iex> delete_comment(comment)
      {:ok, %Comment{}}

      iex> delete_comment(comment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_comment(%Comment{} = comment) do
    Repo.delete(comment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking comment changes.

  ## Examples

      iex> change_comment(comment)
      %Ecto.Changeset{data: %Comment{}}

  """
  def change_comment(%Comment{} = comment, attrs \\ %{}) do
    Comment.changeset(comment, attrs)
  end
end
