defmodule BackendWeb.UserJSON do
  alias Backend.Avatar

  def index(users) do
    %{users: for(user <- users, do: data(user))}
  end

  def show(%{user: user}) do
    %{user: data(user)}
  end

  def show_full_data(%{user: user}) do
    %{user: full_data(user)}
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

  defp full_data(user) do
    %{
      id: user.id,
      avatar: Avatar.url({user.avatar, user}),
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      is_friend: user.is_friend,
      friend_request_received: user.friend_request_received,
      friend_request_sent: user.friend_request_sent,
      is_follower: user.is_follower,
      is_following: user.is_following,
      inserted_at: user.inserted_at
    }
  end
end
