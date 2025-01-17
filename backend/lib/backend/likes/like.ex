defmodule Backend.Likes.Like do
  use Ecto.Schema
  import Ecto.Changeset

  schema "likes" do
    field :content_id, :integer
    field :content_type, :string
    field :user_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(like, attrs) do
    like
    |> cast(attrs, [:user_id, :content_id, :content_type])
    |> validate_required([:user_id, :content_id, :content_type])
  end
end
