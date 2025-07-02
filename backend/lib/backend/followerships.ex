defmodule Backend.Followerships do
  @moduledoc """
  The Followerships context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.Accounts.User
  alias Backend.Followerships.Followership

  @doc """
  Returns the list of followerships.

  ## Examples

      iex> list_followerships()
      [%Followership{}, ...]

  """
  def list_followerships do
    Followership
    |> Repo.all()
    |> Repo.preload([:follower, :followee])
  end

  @doc """
  Gets a single followership.

  Raises `Ecto.NoResultsError` if the Followership does not exist.

  ## Examples

      iex> get_followership!(123)
      %Followership{}

      iex> get_followership!(456)
      ** (Ecto.NoResultsError)

  """
  def get_followership!(id),
    do: Repo.get!(Followership, id) |> Repo.preload([:follower, :followee])

  @doc """
  Creates a followership.

  ## Examples

      iex> create_followership(%{field: value})
      {:ok, %Followership{}}

      iex> create_followership(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_followership(attrs \\ %{}) do
    %Followership{}
    |> Followership.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a followership.

  ## Examples

      iex> update_followership(followership, %{field: new_value})
      {:ok, %Followership{}}

      iex> update_followership(followership, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_followership(%Followership{} = followership, attrs) do
    followership
    |> Followership.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  List Users followers

  ## Example
  iex> followers(%User{} = user)
  [%Followership{}]
  """
  def followers(%User{} = user) do
    from(f in Followership,
      where: f.followee_id == ^user.id,
      join: u in assoc(f, :follower),
      preload: [follower: u],
      select: f
    )
    |> Repo.all()
  end

  @doc """
  List Users a User follows

  ## Example
  iex> following(%User{} = user)
  [%Followership{}]
  """
  def following(%User{} = user) do
    from(f in Followership,
      where: f.follower_id == ^user.id,
      join: u in assoc(f, :followee),
      preload: [followee: u],
      select: f
    )
    |> Repo.all()
  end

  @doc """
  Deletes a followership.

  ## Examples

      iex> delete_followership(followership)
      {:ok, %Followership{}}

      iex> delete_followership(followership)
      {:error, %Ecto.Changeset{}}

  """
  def delete_followership(%Followership{} = followership) do
    Repo.delete(followership)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking followership changes.

  ## Examples

      iex> change_followership(followership)
      %Ecto.Changeset{data: %Followership{}}

  """
  def change_followership(%Followership{} = followership, attrs \\ %{}) do
    Followership.changeset(followership, attrs)
  end
end
