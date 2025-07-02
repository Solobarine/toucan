defmodule BackendWeb.FriendshipJSON do
  alias Backend.Friendships.Friendship

  @doc """
  Renders a list of friendships.
  """
  def index(%{friendships: friendships}) do
    %{data: for(friendship <- friendships, do: data(friendship))}
  end

  @doc """
  Renders a single friendship.
  """
  def show(%{friendship: friendship}) do
    %{data: data(friendship)}
  end

  defp data(%Friendship{} = friendship) do
    %{
      id: friendship.id,
      status: friendship.status,
      user_id: friendship.user_id,
      # user: friendship.user,
      friend_id: friendship.friend_id,
      # friend: friendship.friend,
      inserted_at: friendship.inserted_at,
      updated_at: friendship.updated_at
    }
  end
end
