defmodule Backend.UserBlocks do
  @moduledoc """
  The UserBlocks context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.UserBlocks.UserBlock

  @doc """
  Returns the list of Blocked Users.

  ## Examples

      iex> list_user_blocks()
      [%UserBlock{}, ...]

  """
  def list_user_blocks(user_id) do
    from(ub in UserBlock,
      join: u in assoc(ub, :blocked),
      where: ub.blocker_id == ^user_id and u.id == ub.blocked_id,
      select: u
    )
    |> Repo.all()
  end

  @doc """
  Returns Ids of Users Blocked by another user 
  """
  def get_blocked_user_ids(user_id) do
    from(ub in UserBlock,
      where: ub.blocker_id == ^user_id or ub.blocked_id == ^user_id,
      select:
        fragment(
          "case when ? = ? then ? else ? end",
          ub.blocker_id,
          ^user_id,
          ub.blocked_id,
          ub.blocker_id
        )
    )
    |> Repo.all()
  end

  @doc """
  Gets a single user_block.

  Raises `Ecto.NoResultsError` if the User block does not exist.

  ## Examples

      iex> get_user_block!(123)
      %UserBlock{}

      iex> get_user_block!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user_block!(id), do: Repo.get!(UserBlock, id)

  def get_user_block_by_ids(blocker_id, blocked_id) do
    Repo.get_by!(UserBlock, blocker_id: blocker_id, blocked_id: blocked_id)
  end

  @doc """
  Creates a user_block.

  ## Examples

      iex> create_user_block(%{field: value})
      {:ok, %UserBlock{}}

      iex> create_user_block(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_block(attrs \\ %{}) do
    case %UserBlock{}
         |> UserBlock.changeset(attrs)
         |> Repo.insert() do
      {:ok, block} -> {:ok, Repo.preload(block, [:blocked])}
      {:error, changeset} -> {:error, changeset}
    end
  end

  @doc """
  Deletes a user_block.

  ## Examples

      iex> delete_user_block(user_block)
      {:ok, %UserBlock{}}

      iex> delete_user_block(user_block)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user_block(%UserBlock{} = user_block) do
    Repo.delete(user_block)
  end

  def is_banned(user_id, id) do
    UserBlock
    |> where([u], u.blocker_id == ^user_id and u.blocked_id == ^id)
    |> or_where([u], u.blocker_id == ^id and u.blocked_id == ^user_id)
    |> Repo.one()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user_block changes.

  ## Examples

      iex> change_user_block(user_block)
      %Ecto.Changeset{data: %UserBlock{}}

  """
  def change_user_block(%UserBlock{} = user_block, attrs \\ %{}) do
    UserBlock.changeset(user_block, attrs)
  end
end
