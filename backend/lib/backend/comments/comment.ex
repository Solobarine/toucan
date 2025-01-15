defmodule Backend.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :text, :string
    field :user_id, :id
    field :content_id, :integer
    field :content_type, :string
    field :content, :map, virtual: true

    has_many :replies, __MODULE__, foreign_key: :content_id, where: [content_type: "comment"]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:content_id, :content_type, :text, :user_id])
    |> validate_required([:content_id, :content_type, :text, :user_id])
  end
end
