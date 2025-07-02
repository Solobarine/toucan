defmodule BackendWeb.FollowershipJSON do
  alias BackendWeb.UserJSON
  alias Backend.Followerships.Followership

  @doc """
  Renders a list of followerships.
  """
  def index(%{followerships: followerships}) do
    %{data: for(followership <- followerships, do: data(followership))}
  end

  def index(%{followership: followerships, assoc: assoc}) do
    %{data: for(followership <- followerships, do: assoc_data(followership, assoc))}
  end

  @doc """
  Renders a single followership.
  """
  def show(%{followership: followership}) do
    %{data: data(followership)}
  end

  defp data(%Followership{} = followership) do
    %{
      id: followership.id,
      follower_id: followership.follower_id,
      followee_id: followership.followee_id
    }
  end

  defp assoc_data(%Followership{} = followership, assoc: assoc) do
    case assoc do
      :followers ->
        %{
          id: followership.id,
          follower_id: followership.follower_id,
          follower: UserJSON.show(%{user: followership.follower}).data,
          followee_id: followership.followee_id,
          inserted_at: followership.inserted_at
        }

      :following ->
        %{
          id: followership.id,
          follower_id: followership.follower_id,
          followee_id: followership.followee_id,
          followee: UserJSON.show(%{user: followership.followee}).data,
          inserted_at: followership.inserted_at
        }

      nil ->
        data(followership)
    end
  end
end
