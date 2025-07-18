defmodule Backend.Chats do
  @moduledoc """
  The Chats context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.Chats.Chat

  @doc """
  Returns the list of chats.

  ## Examples

      iex> list_chats()
      [%Chat{}, ...]

  """
  def list_chats do
    Repo.all(Chat)
  end

  @doc """
  Gets a single chat.

  Raises `Ecto.NoResultsError` if the Chat does not exist.

  ## Examples

      iex> get_chat!(123)
      %Chat{}

      iex> get_chat!(456)
      ** (Ecto.NoResultsError)

  """
  def get_chat!(id), do: Repo.get!(Chat, id)

  @doc """
  Creates a chat.

  ## Examples

      iex> create_chat(%{field: value})
      {:ok, %Chat{}}

      iex> create_chat(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_chat(attrs \\ %{}) do
    case Repo.insert(Chat.changeset(%Chat{}, attrs)) do
      {:ok, chat} ->
        {:ok, Repo.preload(chat, [:sender, :receiver])}

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Updates a chat.

  ## Examples

      iex> update_chat(chat, %{field: new_value})
      {:ok, %Chat{}}

      iex> update_chat(chat, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_chat(%Chat{} = chat, attrs) do
    chat
    |> Chat.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a chat.

  ## Examples

      iex> delete_chat(chat)
      {:ok, %Chat{}}

      iex> delete_chat(chat)
      {:error, %Ecto.Changeset{}}

  """
  def delete_chat(%Chat{} = chat) do
    Repo.delete(chat)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking chat changes.

  ## Examples

      iex> change_chat(chat)
      %Ecto.Changeset{data: %Chat{}}

  """
  def change_chat(%Chat{} = chat, attrs \\ %{}) do
    Chat.changeset(chat, attrs)
  end

  @doc """
  Returns chats between 2 users
  """
  def chat_history(user_1_id, user_2_id) do
    from(c in Chat,
      where:
        (c.sender_id == ^user_1_id and c.receiver_id == ^user_2_id) or
          (c.sender_id == ^user_2_id and c.receiver_id == ^user_1_id)
    )
    |> Repo.all()
  end

  @doc """
  Returns 20 most recent chats
  """
  def recents(user_id) do
    from(c in Chat,
      where: c.sender_id == ^user_id or c.receiver_id == ^user_id,
      distinct:
        fragment(
          "LEAST(?, ?), GREATEST(?, ?)",
          c.sender_id,
          c.receiver_id,
          c.sender_id,
          c.receiver_id
        ),
      order_by: [desc: c.inserted_at],
      limit: 20
    )
    |> Repo.all()
  end
end
