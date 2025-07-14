defmodule BackendWeb.CommentJSON do
  alias BackendWeb.UserJSON
  alias Backend.Comments.Comment

  @doc """
  Renders a list of comments.
  """
  def index(%{comments: comments}) do
    %{comments: for(comment <- comments, do: data(comment))}
  end

  @doc """
  Renders a single comment.
  """
  def show(%{comment: comment}) do
    %{comment: data(comment)}
  end

  defp data(%Comment{} = comment) do
    %{
      id: comment.id,
      content_id: comment.content_id,
      user_id: comment.user_id,
      text: comment.text,
      user: UserJSON.show(%{user: comment.user}).user,
      # replies: index(%{comments: Comments.list_comment_replies(comment.id)}).comments,
      replies: [],
      inserted_at: comment.inserted_at
    }
  end
end
