defmodule Backend.Notifications do
  @moduledoc """
  The Notifications context.
  """

  import Ecto.Query, warn: false

  alias Backend.Friendships.Friendship
  alias Backend.Followerships.Followership
  alias Backend.Repo
  alias Backend.Notifications.Notification

  @spec list(integer(), Keyword.t()) :: [Notification.t()]
  def list(user_id, opts \\ []) do
    per_page = Keyword.get(opts, :per, 20)
    page = Keyword.get(opts, :page, 1)

    Notification
    |> where([n], n.user_id == ^user_id)
    |> order_by([n], desc: n.inserted_at)
    |> limit(^per_page)
    |> offset(^(per_page * (page - 1)))
    |> Repo.all()
    |> Repo.preload([:actor])
  end

  @doc """
  Gets a single notification.

  Raises `Ecto.NoResultsError` if the Notification does not exist.

  ## Examples

      iex> get_notification!(123)
      %Notification{}

      iex> get_notification!(456)
      ** (Ecto.NoResultsError)

  """
  def get_notification!(id), do: Repo.get!(Notification, id)

  @spec notify_user(map()) :: {:ok, %Notification{}} | {:error, %Ecto.Changeset{}}
  def notify_user(attrs) do
    result =
      %Notification{}
      |> Notification.changeset(attrs)
      |> Repo.insert()

    case result do
      {:ok, notification} -> broadcast({:ok, Repo.preload(notification, [:actor])})
      {:error, changeset} -> {:error, changeset}
    end
  end

  @spec mark_read(Notification.t() | integer()) :: {:ok, Notification.t()}
  def mark_read(%Notification{} = n), do: mark_read(n.id)

  def mark_read(id) do
    Repo.get!(Notification, id)
    |> Notification.changeset(read_at: DateTime.utc_now())
    |> Repo.update()
  end

  @doc """
  Notify Users
  """
  def notify_users(user_id, _content_owner_id,
        verb: verb,
        object: object,
        metadata: metadata
      ) do
    ids = get_relevant_user_ids(user_id)
    now = DateTime.utc_now() |> DateTime.truncate(:second)

    notifications =
      Enum.map(ids, fn id ->
        %{
          user_id: id,
          actor_id: user_id,
          verb: verb,
          object: object,
          metadata: metadata,
          inserted_at: now,
          updated_at: now
        }
      end)

    case Repo.insert_all(Notification, notifications, returning: true) do
      {_count, sent_notifcations} when is_list(sent_notifcations) ->
        Enum.each(sent_notifcations, fn notif_data ->
          notif_data
          # |> struct(Notification)
          |> Repo.preload(:actor)
          |> then(&broadcast({:ok, &1}))
        end)

      error ->
        {:error, error}
    end
  end

  @doc """
  Deletes a notification.

  ## Examples

      iex> delete_notification(notification)
      {:ok, %Notification{}}

      iex> delete_notification(notification)
      {:error, %Ecto.Changeset{}}

  """
  def delete_notification(%Notification{} = notification) do
    Repo.delete(notification)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking notification changes.

  ## Examples

      iex> change_notification(notification)
      %Ecto.Changeset{data: %Notification{}}

  """
  def change_notification(%Notification{} = notification, attrs \\ %{}) do
    Notification.changeset(notification, attrs)
  end

  defp broadcast({:error, _} = err), do: err

  defp broadcast({:ok, notification} = ok) do
    Phoenix.PubSub.broadcast(
      Backend.PubSub,
      "notifications:#{notification.user_id}",
      {:new_notification, notification}
    )

    ok
  end

  defp get_relevant_user_ids(user_id) do
    followership_ids =
      from(f in Followership, where: f.followee_id == ^user_id, select: f.follower_id)
      |> Repo.all()

    friend_ids =
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
      |> Repo.all()

    Enum.uniq(followership_ids ++ friend_ids)
  end
end
