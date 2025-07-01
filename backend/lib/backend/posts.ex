defmodule Backend.Posts do
  @moduledoc """
  The Posts context.
  """

  import Ecto.Query, warn: false
  alias Backend.Comments.Comment
  alias Backend.Likes.Like
  alias Backend.Repo
  alias Backend.Posts.{Post, Repost}

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Post{}, ...]

  """
  def list_posts(user_id \\ nil) do
    base_posts =
      from p in Post,
        join: u in assoc(p, :user),
        left_join: l in Like,
        on: l.content_id == p.id and l.content_type == "post",
        left_join: c in Comment,
        on: c.content_id == p.id,
        left_join: r in Repost,
        on: r.original_post_id == p.id,
        left_join: ul in Like,
        on:
          ul.content_id == p.id and
            ul.content_type == "post" and
            ul.user_id == ^user_id,
        group_by: [p.id, u.id],
        select: %{
          # helps you tell them apart later
          item_type: "post",
          id: p.id,
          body: p.body,
          inserted_at: p.inserted_at,
          user: u,
          # posts have no “original”
          original_post: nil,
          likes_count: count(l.id, :distinct),
          comments_count: count(c.id, :distinct),
          reposts_count: count(r.id, :distinct),
          is_liked_by_user: fragment("max(case when ? is null then 0 else 1 end) = 1", ul.id)
        }

    base_reposts =
      from r in Repost,
        join: reposter in assoc(r, :user),
        join: p in assoc(r, :original_post),
        join: post_author in assoc(p, :user),

        # counts & “is‑liked” are on the **repost** itself
        left_join: l in Like,
        on: l.content_id == r.id and l.content_type == "repost",
        left_join: c in Comment,
        on: c.content_id == r.id,
        left_join: ul in Like,
        on:
          ul.content_id == r.id and
            ul.content_type == "repost" and
            ul.user_id == ^user_id,
        group_by: [r.id, reposter.id, p.id, post_author.id],
        select: %{
          item_type: "repost",
          id: r.id,
          body: r.body,
          # when the repost happened
          inserted_at: r.inserted_at,
          # the *reposter*
          user: reposter,
          # nest original post + author
          original_post: %{p | user: post_author},
          likes_count: 0,
          comments_count: 0,
          # usually we don’t count reposts of reposts
          reposts_count: 0,
          is_liked_by_user: fragment("max(case when ? is null then 0 else 1 end) = 1", ul.id)
        }

    posts = Repo.all(base_posts |> order_by(desc: :inserted_at))
    reposts = Repo.all(base_reposts |> order_by(desc: :inserted_at))

    feed = (posts ++ reposts)
      |> Enum.sort_by(
        fn item ->
          case item.inserted_at do
            %DateTime{} = dt ->
              # already good
              dt

            %NaiveDateTime{} = ndt ->
              # assume the naive value is UTC and turn it into DateTime
              DateTime.from_naive!(ndt, "Etc/UTC")
          end
        end,
        # both keys are DateTime now
        {:desc, DateTime}
      )

    feed
  end

  @doc """
  Returns a list of posts belonging to a user
  """
  def list_user_posts(user_id) do
    base =
      from p in Post,
        join: u in assoc(p, :user),
        left_join: l in Like,
        on: l.content_id == p.id and l.content_type == "post",
        left_join: c in Comment,
        on: c.content_id == p.id,
        left_join: r in Repost,
        on: r.original_post_id == p.id,
        left_join: ul in Like,
        on:
          ul.content_id == p.id and ul.content_type == "post" and
            ul.user_id == ^user_id,
        where: p.user_id == ^user_id,
        group_by: [p.id, u.id],
        select: %Post{
          p
          | user: u,
            likes_count: count(l.id, :distinct),
            comments_count: count(c.id, :distinct),
            reposts_count: count(r.id, :distinct),
            is_liked_by_user:
              fragment(
                "max(case when ? is null then 0 else 1 end) = 1",
                ul.id
              )
        }

    query =
      from b in base,
        order_by: [desc: b.inserted_at]

    Repo.all(query)
  end

  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_post!(123)
      %Post{}

      iex> get_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post!(id), do: Repo.get!(Post, id)

  @doc """
  Creates a post.

  ## Examples

      iex> create_post(%{field: value})
      {:ok, %Post{}}

      iex> create_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_post(post, %{field: new_value})
      {:ok, %Post{}}

      iex> update_post(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Count User Posts
  """
  def count_posts(user_id) do
    Repo.aggregate(from(p in Post, where: p.user_id == ^user_id), :count, :id)
  end

  @doc """
  Deletes a post.

  ## Examples

      iex> delete_post(post)
      {:ok, %Post{}}

      iex> delete_post(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  def is_post_owner(post_user_id, user_id) do
    post_user_id == user_id
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_post(post)
      %Ecto.Changeset{data: %Post{}}

  """
  def change_post(%Post{} = post, attrs \\ %{}) do
    Post.changeset(post, attrs)
  end

  @doc """
  Creates a repost. Returns `{:ok, %Repost{}}` or `{:error, reason}`
  """
  def create_repost(attrs \\ %{}) do
    with {:ok, repost} <-
           %Repost{}
           |> Repost.changeset(attrs)
           |> Repo.insert() do
      post = get_post!(repost.original_post_id)
      new_score = Post.calculate_ranking_score(post)
      update_post(post, %{ranking_score: new_score})
      # Reload Repost with associations
      repost = Repo.preload(repost, [:original_post, :user])

      {:ok, repost}
    end
  end
end
