defmodule Backend.Friendships do
  @moduledoc """
  The Friendships context.
  """

  import Ecto.Query, warn: false
  alias Backend.Followerships.Followership
  alias Backend.Repo
  alias Backend.Accounts.User
  alias Backend.Friendships.Friendship

  @doc """
  Returns the list of friendships.

  ## Examples

      iex> list_friendships()
      [%Friendship{}, ...]

  """
  def list_friendships do
    Repo.all(Friendship)
  end

  @doc """
  Gets a single friendship.

  Raises `Ecto.NoResultsError` if the Friendship does not exist.

  ## Examples

      iex> get_friendship!(123)
      %Friendship{}

      iex> get_friendship!(456)
      ** (Ecto.NoResultsError)

  """
  def get_friendship!(id), do: Repo.get!(Friendship, id)

  @doc """
  Delete a Friendship

  ## Examples
  iex> get_pending_friendship!(user_id, current_user_id)
  %Friendship{}

  iex> get_pending_friendship!(user_id, current_user_id)
  ** (Ecto.NoResultsError)
  """
  def get_pending_friendship!(user_id, current_user_id) do
    Friendship
    |> where(
      [f],
      f.user_id == ^current_user_id and f.friend_id == ^user_id and f.status == ^:pending
    )
    |> or_where(
      [f],
      f.friend_id == ^current_user_id and f.user_id == ^user_id and f.status == ^:pending
    )
    |> Repo.one!()
  end

  @doc """
  Create a Friendship
  """
  def create_friendship(attrs \\ %{}) do
    %Friendship{}
    |> Friendship.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Create a Friend request

  ## Examples
      iex> send_friend_request(%{field: value})
      {:ok, %Friendship{}}

      iex> send_friend_request(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def send_friend_request(current_user_id, friend_id, status \\ :pending) do
    %Friendship{}
    |> Friendship.changeset(%{user_id: current_user_id, friend_id: friend_id, status: status})
    |> Repo.insert(
      on_conflict: {:replace, [:status]},
      conflict_target: [:user_id, :friend_id]
    )
  end

  @doc """
  Accept Friend Request
  """
  def accept_friend_request(%Friendship{} = friendship) do
    friendship
    |> Friendship.changeset(%{status: :accepted})
    |> Repo.update()
  end

  @doc """
  Decline a Friend Request
  """
  def decline_friend_request(%Friendship{} = friendship) do
    friendship
    |> Friendship.changeset(%{status: :blocked})
    |> Repo.update()
  end

  @doc """
  Unfriend a User
  """
  def unfriend(%User{id: uid}, %User{id: fid}) do
    from(f in Friendship,
      where:
        (f.user_id == ^uid and f.friend_id == ^fid) or
          (f.user_id == ^fid and f.friend_id == ^uid)
    )
    |> Repo.delete_all()

    :ok
  end

  @doc """
  Unfriend a user
  """
  def unfriend(%Friendship{} = friendship) do
    Repo.delete(friendship)
  end

  @doc """
  Retrieve sent friend requests
  """
  def sent_friend_requests(user_id, opts \\ []) do
    query =
      from(f in Friendship,
        where: f.user_id == ^user_id and f.status == :pending,
        preload: [:user, :friend]
      )

    Repo.all(paginate(query, opts))
  end

  @doc """
  Retrieve recieved friend requests
  """
  def recieved_friend_requests(user_id, opts \\ []) do
    query =
      from(f in Friendship,
        where: f.friend_id == ^user_id and f.status == :pending,
        preload: [:user, :friend]
      )

    Repo.all(paginate(query, opts))
  end

  @doc """
  Retrieve Users friends
  """
  def friends(user_id, opts \\ []),
    do: Repo.all(paginate(friends_query(user_id), opts))

  @doc """
  Retrieve User Friends Suggestions
  """
  def friends_suggestions(user_id, limit \\ 20) do
    # Step 1: Get direct friend IDs
    friend_ids_query =
      from(f in Friendship,
        where: f.status == ^:accepted and (f.user_id == ^user_id or f.friend_id == ^user_id),
        select:
          fragment(
            "case when ? = ? then ? else ? end",
            f.user_id,
            ^user_id,
            f.friend_id,
            f.user_id
          )
      )

    # Step 2: Get Friends of Friends
    friends_of_friends_query =
      from(u in User,
        join: f in Friendship,
        on: f.status == ^:accepted and (f.user_id == u.id or f.friend_id == u.id),
        where:
          u.id != ^user_id and
            u.id not in subquery(friend_ids_query) and
            (f.user_id in subquery(friend_ids_query) or f.friend_id in subquery(friend_ids_query)),
        select: u
      )

    # Step 3: Get Users Followed by Friends
    followed_by_friends_query =
      from(u in User,
        join: f in Followership,
        on: f.followee_id == u.id,
        where:
          u.id != ^user_id and
            u.id not in subquery(friend_ids_query) and
            f.follower_id in subquery(friend_ids_query),
        select: u
      )

    # Step 4: Union both, deduplicate, and randomize
    friends_of_friends_query
    |> union_all(^followed_by_friends_query)
    |> subquery()
    |> distinct(true)
    # |> order_by(fragment("RANDOM()"))
    |> limit(^limit)
    |> Repo.all()
  end

  @doc """
  Delete a Friendship

  ## Examples
  iex> delete_friendship!(friendship)
  {:ok, %Friendship{}}

  iex> delete_friendship!(friendship)
  {:error, %Ecto.Changeset{}}

  """
  def delete_friendship(friendship), do: Repo.delete(friendship)

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking friendship changes.

  ## Examples

      iex> change_friendship(friendship)
      %Ecto.Changeset{data: %Friendship{}}

  """
  def change_friendship(%Friendship{} = friendship, attrs \\ %{}) do
    Friendship.changeset(friendship, attrs)
  end

  defp friends_query(user_id) do
    from u in User,
      join: f in Friendship,
      on:
        (f.user_id == ^user_id and f.friend_id == u.id) or
          (f.friend_id == ^user_id and f.user_id == u.id),
      where: f.status == ^:accepted
  end

  defp paginate(query, opts) do
    page = Keyword.get(opts, :page, 1)
    per = Keyword.get(opts, :per, 20)
    query |> limit(^per) |> offset(^((page - 1) * per))
  end
end
