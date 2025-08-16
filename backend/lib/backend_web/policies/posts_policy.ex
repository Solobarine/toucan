defmodule BackendWeb.Policies.PostsPolicy do
  alias Backend.UserBlocks

  def show_post(post, user) do
    if UserBlocks.is_banned(post.user_id, user.id) do
      {:error, :forbidden}
    else
      :ok
    end
  end

  def update(post, user) do
    if user.id == post.user_id do
      :ok
    else
      {:error, :forbidden}
    end
  end

  def delete(post, user) do
    update(post, user)
  end

  def show_repost(repost, user) do
    if UserBlocks.is_banned(repost.original_post.user_id, user.id) do
      {:error, :forbidden}
    else
      :ok
    end
  end

  def repost(post, user) do
    if user.id == post.user_id do
      {:error, :bad_request}
    else
      :ok
    end
  end

  def update_repost(repost, user) do
    if repost.user_id == user.id do
      :ok
    else
      {:error, :forbidden}
    end
  end

  def delete_repost(repost, user) do
    update_repost(repost, user)
  end
end
