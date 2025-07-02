defmodule BackendWeb.Policies.FriendshipsPolicy do
  alias BackendWeb.ErrorResponse
  alias Backend.Friendships.Friendship

  def create(conn, user_id, friend_id) do
    if user_id == friend_id do
      raise ErrorResponse.BadRequest
    else
      conn
    end
  end

  def accept_request(conn, %Friendship{} = friendship, user_id) do
    if user_id == friendship.friend_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  def reject_request(conn, %Friendship{} = friendship, user_id) do
    accept_request(conn, friendship, user_id)
  end

  def unfriend(conn, %Friendship{} = friendship, user_id) do
    if user_id == friendship.user_id || user_id == friendship.friend_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end
end
