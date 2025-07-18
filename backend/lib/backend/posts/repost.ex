defmodule Backend.Posts.Repost do
  use Ecto.Schema
  import Ecto.Changeset

  alias Backend.Accounts.User
  alias Backend.Posts.Post

  schema "reposts" do
    field :body, :string
    belongs_to :user, User
    belongs_to :original_post, Post
    timestamps()
  end

  def changeset(repost, attrs) do
    repost
    |> cast(attrs, [:body, :user_id, :original_post_id])
    |> validate_required([:user_id, :original_post_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:original_post_id)
    |> unique_constraint([:user_id, :original_post_id], message: "Post already reposted")
  end

  def update_changeset(repost, attrs) do
    repost
    |> cast(attrs, [:body])
    |> validate_required([:body])
  end
end
