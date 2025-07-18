defmodule Backend.Posts.Post do
  use Ecto.Schema

  import Ecto.Query, warn: false
  import Ecto.Changeset

  alias __MODULE__
  alias Backend.Repo
  alias Backend.Accounts.User
  alias Backend.Comments.Comment
  alias Backend.Posts.Repost
  alias Backend.Likes.Like

  schema "posts" do
    field :title, :string
    field :body, :string

    belongs_to :user, User

    has_many :comments, Comment,
      foreign_key: :content_id,
      where: [content_type: "post"]

    has_many :likes, Like,
      foreign_key: :content_id,
      where: [content_type: "post"]

    has_many :reposts, Repost, foreign_key: :original_post_id

    timestamps(type: :utc_datetime)

    # virtual fields
    field :likes_count, :integer, virtual: true
    field :comments_count, :integer, virtual: true
    field :reposts_count, :integer, virtual: true
    field :is_liked_by_user, :boolean, virtual: true
  end

  @doc """
  Calculate post ranking score
  """
  def calculate_ranking_score(%Post{} = post) do
    hours_since_posted = DateTime.diff(DateTime.utc_now(), post.inserted_at, :second) / 3600.0

    weight = 1.5

    %{likes_count: likes_count, comments_count: comments_count, reposts_count: reposts_count} =
      get_post_counters(post.id)

    base_score = likes_count * 1.5 + comments_count * 2 + reposts_count * 3

    score = base_score / :math.pow(hours_since_posted + 3, weight)
    Float.round(score, 5)
  end

  @doc """
  Calculate counters for post
  """
  def get_post_counters(post_id) when is_integer(post_id) do
    post_type = "post"

    query =
      Post
      |> where([p], p.id == ^post_id)
      |> join(:left, [p], l in Like, on: l.content_id == p.id and l.content_type == ^post_type)
      |> join(:left, [p, l], c in Comment,
        on: c.content_id == p.id and c.content_type == ^post_type
      )
      |> join(:left, [p, l, c], r in Repost, on: r.original_post_id == p.id)
      |> group_by([p, _l, _c, _r], p.id)
      |> select([_p, l, c, r], %{
        likes_count: count(l.id, :distinct),
        comments_count: count(c.id, :distinct),
        reposts_count: count(r.id, :distinct)
      })

    Repo.one(query) || %{likes_count: 0, comments_count: 0, reposts_count: 0}
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :body, :user_id])
    |> validate_required([:body, :user_id])
  end

  def update_changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :body])
    |> validate_required([:body])
  end
end
