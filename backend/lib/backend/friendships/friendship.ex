defmodule Backend.Friendships.Friendship do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Accounts.User

  @statuses ~w(pending accepted blocked)a

  schema "friendships" do
    field :status, Ecto.Enum, values: @statuses
    belongs_to :user, User
    belongs_to :friend, User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(friendship, attrs) do
    friendship
    |> cast(attrs, [:user_id, :friend_id, :status])
    |> validate_required([:user_id, :friend_id])
    |> validate_inclusion(:status, @statuses)
    |> assoc_constraint(:user)
    |> assoc_constraint(:friend)
    |> unique_constraint([:user_id, :friend_id], name: :unique_friend_pair)
  end
end
