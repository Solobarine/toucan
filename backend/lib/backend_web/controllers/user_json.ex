defmodule BackendWeb.UserJSON do
  alias Backend.Avatar

  def index(users) do
    %{users: for(user <- users, do: data(user))}
  end

  def show(%{user: user}) do
    %{user: data(user)}
  end

  defp data(user) do
    %{
      id: user.id,
      avatar: Avatar.url({user.avatar, user}),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email || nil,
      username: user.username,
      inserted_at: user.inserted_at
    }
  end
end
