defmodule BackendWeb.LikeJSON do
  alias Backend.Likes.Like

  @doc """
  Renders a list of likes.
  """
  def index(%{likes: likes}) do
    %{likes: for(like <- likes, do: data(like))}
  end

  @doc """
  Renders a single like.
  """
  def show(%{like: like}) do
    %{like: data(like)}
  end

  defp data(%Like{} = like) do
    %{
      id: like.id,
      content_id: like.content_id,
      content_type: like.content_type
    }
  end
end
