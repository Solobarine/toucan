defmodule BackendWeb.PostJSON do
  alias Backend.Posts.Post
  alias BackendWeb.CommentJSON
  alias Backend.{Accounts, Comments, Likes, Posts}

  @doc """
  Renders a list of posts.
  """
  def index(%{posts: posts, current_user_id: current_user_id}) do
    %{posts: for(post <- posts, do: data(post, current_user_id))}
  end

  @doc """
  Renders a single post.
  """
  def show(%{post: post, current_user_id: current_user_id}) do
    %{post: post_data(post, current_user_id)}
  end

  defp data(%Post{} = post, user_id) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      inserted_at: post.inserted_at,
      user: Accounts.get_user!(post.user_id),
      likes_count: Likes.count_likes(post.id, "post"),
      comments_count: Comments.count_comments(post.id, "post"),
      is_owner: Posts.is_post_owner(post.user_id, user_id),
      is_liked_by_user: Likes.is_liked_by_user(user_id, "post"),
      reposts_count: 0,
      comments: []
    }
  end

  defp post_data(%Post{} = post, user_id) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      inserted_at: post.inserted_at,
      user: Accounts.get_user!(post.user_id),
      likes_count: Likes.count_likes(post.id, "post"),
      comments_count: Comments.count_comments(post.id, "post"),
      is_owner: Posts.is_post_owner(post.user_id, user_id),
      is_liked_by_user: Likes.is_liked_by_user(user_id, "post"),
      reposts_count: 0,
      comments: CommentJSON.index(%{comments: Comments.list_post_comments(post.id)}).comments
    }
  end
end
