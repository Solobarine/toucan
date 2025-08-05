defmodule Backend.Followerships.Followership do
  use Ecto.Schema
  import Ecto.Changeset

  schema "followerships" do
    belongs_to :follower, Backend.Accounts.User, foreign_key: :follower_id
    belongs_to :followee, Backend.Accounts.User, foreign_key: :followee_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(followership, attrs) do
    followership
    |> cast(attrs, [:follower_id, :followee_id])
    |> validate_required([:follower_id, :followee_id])
    |> assoc_constraint(:follower)
    |> assoc_constraint(:followee)
    |> unique_constraint([:follower_id, :followee_id], name: :unique_followership)
  end
end
