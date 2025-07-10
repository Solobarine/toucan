defmodule Backend.Chats.Chat do
  use Ecto.Schema
  import Ecto.Changeset

  alias Backend.Accounts.User

  schema "chats" do
    field :name, :string
    belongs_to :sender, User, foreign_key: :sender_id
    belongs_to :receiver, User, foreign_key: :receiver_id
    field :message, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(chat, attrs) do
    chat
    |> cast(attrs, [:name, :sender_id, :receiver_id, :message])
    |> validate_required([:name, :sender_id, :receiver_id, :message])
    |> foreign_key_constraint(:sender_id)
    |> foreign_key_constraint(:receiver_id)
  end
end
