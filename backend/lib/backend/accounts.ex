defmodule Backend.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Backend.Followerships.Followership
  alias Backend.Friendships.Friendship
  alias Backend.Repo
  alias Backend.Accounts.User
  alias Backend.Guardian
  alias Bcrypt

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_full_user_details(id, current_user_id \\ -1) do
    from(
      u in User,
      where: u.id == ^id,
      left_join: fr in Friendship,
      on:
        (fr.user_id == ^current_user_id and fr.friend_id == ^id) or
          (fr.friend_id == ^current_user_id and fr.user_id == ^id),
      left_join: fo in Followership,
      on: fo.follower_id == ^id and fo.followee_id == ^id,
      left_join: fe in Followership,
      on: fe.followee_id == ^id and fe.follower_id == ^current_user_id,
      select: %{
        id: u.id,
        avatar: u.avatar,
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username,
        inserted_at: u.inserted_at,
        friend_request_sent:
          type(
            fragment(
              "COALESCE((? = 'pending' AND ? = ?), false)",
              fr.status,
              fr.user_id,
              ^current_user_id
            ),
            :boolean
          ),
        friend_request_received:
          type(
            fragment(
              "COALESCE((? = 'pending' AND ? = ?), false)",
              fr.status,
              fr.friend_id,
              ^current_user_id
            ),
            :boolean
          ),
        is_friend:
          type(
            fragment("COALESCE((? = 'accepted'), false)", fr.status),
            :boolean
          ),
        is_follower:
          type(
            fragment("COALESCE((? = ?), false)", fo.follower_id, ^id),
            :boolean
          ),
        is_following:
          type(
            fragment("COALESCE((? = ?), false)", fe.followee_id, ^current_user_id),
            :boolean
          )
      }
    )
    |> Repo.one!()
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.update_changeset(attrs)
    |> Repo.update()
  end

  def update_user_avatar(%User{} = user, attrs) do
    user
    |> User.update_avatar_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  @doc """
  Registers a User, returns {:ok, user} or {:error, :invalid_credentials}
  """
  def register(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Authenticates a User using Email and Password
  """
  def authenticate(email, password) do
    user = Repo.get_by(User, email: email)

    if user && Bcrypt.verify_pass(password, user.password_hash) do
      {:ok, user}
    else
      {:error, :invalid_credentials}
    end
  end

  def update_password(user, current_password, new_password)
      when is_binary(current_password) and is_binary(new_password) do
    if user && Bcrypt.verify_pass(current_password, user.password_hash) do
      user |> User.update_password_changeset(%{password_hash: new_password}) |> Repo.update()
    else
      {:error, "Invalid Credentials"}
    end
  end

  @doc """
  Generates a JWT Token for a User
  """
  def generate_jwt(user) do
    {:ok, token, _claims} = Guardian.encode_and_sign(user)
    token
  end
end
