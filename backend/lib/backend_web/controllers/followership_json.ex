defmodule BackendWeb.FollowershipJSON do
  alias Backend.Accounts.User
  alias BackendWeb.UserJSON
  alias Backend.Followerships.Followership

  @doc """
  Renders a list of followerships.
  """
  def index(%{followerships: followerships, assoc: assoc}) do
    %{followerships: for(followership <- followerships, do: assoc_data(followership, assoc))}
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

  defp assoc_data(%User{} = followership, assoc) do
    case assoc do
      :followers ->
        UserJSON.show(%{user: followership}).user

      :following ->
        UserJSON.show(%{user: followership}).user

      nil ->
        data(followership)
    end
  end
end
