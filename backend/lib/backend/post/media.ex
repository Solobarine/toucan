defmodule Backend.Post.Media do
  alias Backend.Posts.Post
  use Ecto.Schema
  use Waffle.Ecto.Schema

  import Ecto.Changeset

  schema "post_media" do
    field :file, Backend.Media.Type

    belongs_to :post, Post

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(media, attrs) do
    media
    |> cast(attrs, [:file])
    |> cast_attachments(attrs, [:file])
    |> validate_required([:file])
  end
end
