defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Waffle.Ecto.Schema

  alias Backend.Friendships.Friendship
  alias Backend.Avatar

  @derive {Jason.Encoder, only: [:id, :username, :first_name, :last_name, :email, :avatar]}
  schema "users" do
    field :username, :string
    field :first_name, :string
    field :last_name, :string
    field :avatar, Avatar.Type
    field :email, :string
    field :password_hash, :string
    field :tos, :boolean

    has_many :sent_friend_requests, Friendship, foreign_key: :user_id

    has_many :received_friend_requests, Friendship, foreign_key: :friend_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :username, :email, :password_hash, :tos, :avatar])
    |> validate_required([:first_name, :last_name, :email, :password_hash, :tos])
    |> unique_constraint(:email)
    |> put_password_hash
  end

  def update_changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :avatar])
    |> cast_attachments(attrs, [:avatar])
    |> validate_required([:first_name, :last_name])
    |> unique_constraint(:username)
  end

  defp put_password_hash(changeset) do
    if password = get_change(changeset, :password_hash) do
      changeset
      |> put_change(:password_hash, Bcrypt.hash_pwd_salt(password))
    else
      changeset
    end
  end
end
