defmodule Backend.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  alias Backend.Accounts.User
  alias Backend.Posts.Post

  @derive {Jason.Encoder,
           only: [
             :id,
             :user_id,
             :text,
             :content_type,
             :content_id,
             :inserted_at,
             :updated_at,
             :user
           ]}
  schema "comments" do
    belongs_to :user, User
    belongs_to :post, Post, foreign_key: :content_id, where: [content_type: "post"]

    field :text, :string
    field :content_type, :string
    field :content, :map, virtual: true

    has_many :replies, __MODULE__, foreign_key: :content_id, where: [content_type: "comment"]

    has_many :likes, Backend.Likes.Like,
      foreign_key: :content_id,
      where: [content_type: "comment"]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:content_id, :content_type, :text, :user_id])
    |> validate_required([:content_id, :content_type, :text, :user_id])
  end
end
