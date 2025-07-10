defmodule Backend.Notifications do
  @moduledoc """
  The Notifications context.
  """

  import Ecto.Query, warn: false

  alias Backend.Repo
  alias Backend.Notifications.Notification

  @spec list(integer(), Keyword.t()) :: [Notification.t()]
  def list(user_id, opts \\ []) do
    per_page = Keyword.get(opts, :per, 20)
    page     = Keyword.get(opts, :page, 1)

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
    %Notification{}
    |> Notification.changeset(attrs)
    |> Repo.insert()
    |> broadcast()
  end

  @spec mark_read(Notification.t() | integer()) :: {:ok, Notification.t()}
  def mark_read(%Notification{} = n), do: mark_read(n.id)
  def mark_read(id) do
    Repo.get!(Notification, id)
    |> Notification.changeset(read_at: DateTime.utc_now())
    |> Repo.update()
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
   Phoenix.PubSub.broadcast(Backend.PubSub, "notifications:#{notification.user_id}", {:new_notification, notification})
   ok
  end
end
