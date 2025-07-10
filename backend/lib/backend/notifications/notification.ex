defmodule Backend.Notifications.Notification do
  use Ecto.Schema
  import Ecto.Changeset

  alias Backend.Accounts.User

  schema "notifications" do
    belongs_to :user, User
    belongs_to :actor, User

    field :verb, :string
    field :metadata, :map, default: %{}
    field :object, :map, default: %{}
    field :read_at, :utc_datetime

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(notification, attrs) do
    notification
    |> cast(attrs, [:user_id, :actor_id, :verb, :object, :metadata, :read_at])
    |> validate_required([:user_id, :actor_id,:verb])
  end
end
