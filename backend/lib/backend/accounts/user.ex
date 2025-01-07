defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :username, :first_name, :last_name, :email]}
  schema "users" do
    field :username, :string
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :password_hash, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :username, :email, :password_hash])
    |> validate_required([:first_name, :last_name, :username, :email, :password_hash])
    |> unique_constraint(:email)
    |> put_password_hash
  end

  def update_changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :username])
    |> validate_required([:first_name, :last_name, :username])
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
