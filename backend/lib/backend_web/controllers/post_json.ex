defmodule BackendWeb.PostJSON do
  alias Backend.Posts.Post
  alias BackendWeb.CommentJSON
  alias BackendWeb.PostJSON
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
  def show(%{post: post, current_user_id: user_id}) do
    %{post: post_data(post, user_id)}
  end

  defp data(%Post{} = post, user_id) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      inserted_at: post.inserted_at,
      user: post.user,
      likes_count: post.likes_count,
      comments_count: post.comments_count,
      reposts_count: post.reposts_count,
      is_owner: post.user_id == user_id,
      is_liked_by_user: post.is_liked_by_user,
      comments: []
    }
  end

  defp data(%{item_type: "post"} = post, user_id) do
    %{
      id: post.id,
      item_type: post.item_type,
      body: post.body,
      inserted_at: post.inserted_at,
      user: post.user,
      user_id: post.user.id,
      likes_count: post.likes_count,
      comments_count: post.comments_count,
      reposts_count: post.reposts_count,
      is_owner: post.user.id == user_id,
      is_liked_by_user: post.is_liked_by_user,
      original_post: nil,
      comments: []
    }
  end

  defp data(%{item_type: "repost"} = repost, user_id) do
    %{
      item_type: repost.item_type,
      id: repost.id,
      body: repost.body,
      inserted_at: repost.inserted_at,
      user: repost.user,
      likes_count: repost.likes_count,
      comments_count: repost.comments_count,
      reposts_count: 0,
      is_owner: repost.user.id == user_id,
      is_liked_by_user: repost.is_liked_by_user,
      original_post_id: repost.original_post.id,
      original_post:
        PostJSON.show(%{
          post: repost.original_post,
          current_user_id: user_id
        }).post
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
      is_liked_by_user: Likes.is_liked_by_user(user_id, post.id, "post"),
      reposts_count: 0,
      comments: CommentJSON.index(%{comments: Comments.list_post_comments(post.id)}).comments
    }
  end
end
