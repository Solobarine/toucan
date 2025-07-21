defmodule Backend.UserBlocks.UserBlock do
  use Ecto.Schema
  import Ecto.Changeset

  alias Backend.Accounts.User

  schema "user_blocks" do
    belongs_to :blocker, User
    belongs_to :blocked, User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user_block, attrs) do
    user_block
    |> cast(attrs, [:blocker_id, :blocked_id])
    |> validate_required([:blocker_id, :blocked_id])
    |> validate_blocking_self()
    |> foreign_key_constraint(:blocker_id)
    |> foreign_key_constraint(:blocked_id)
    |> unique_constraint([:blocker_id, :blocked_id], message: "User already blocked")
  end

  defp validate_blocking_self(changeset) do
    blocker_id = get_field(changeset, :blocker_id)
    blocked_id = get_field(changeset, :blocked_id)

    if blocker_id && blocked_id && blocker_id == blocked_id do
      add_error(changeset, :blocked_id, "can't block yourself")
    else
      changeset
    end
  end
end
