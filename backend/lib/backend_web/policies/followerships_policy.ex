defmodule BackendWeb.Policies.FollowershipsPolicy do
  alias Backend.Followerships.Followership
  alias BackendWeb.ErrorResponse

  def create(conn, user_id, follower_id) do
    if user_id == follower_id do
      raise ErrorResponse.BadRequest
    else
      conn
    end
  end

  def delete(conn, %Followership{} = followership, user_id) do
    if followership.follower_id == user_id do
      conn
    else
      raise ErrorResponse.BadRequest
    end
  end
end
