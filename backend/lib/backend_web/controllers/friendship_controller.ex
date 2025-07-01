defmodule BackendWeb.FriendshipController do
  use BackendWeb, :controller

  alias BackendWeb.Policies.FriendshipsPolicy
  alias Backend.Friendships
  alias Backend.Friendships.Friendship

  action_fallback BackendWeb.FallbackController

  def index(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)

    page = Map.get(params, "page", "1") |> String.to_integer()
    per = Map.get(params, "per", "20") |> String.to_integer()

    friends = Friendships.friends(current_user.id, page: page, per: per)
    render(conn, :index, friendships: friends)
  end

  def create(conn, %{"friendship" => %{"friend_id" => fid}}) do
    current_user = Guardian.Plug.current_resource(conn)

    FriendshipsPolicy.create(conn, current_user.id, fid)

    with {:ok, %Friendship{} = friendship} <-
           Friendships.send_friend_request(current_user.id, fid, :pending) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/friendships/#{friendship}")
      |> render(:show, friendship: friendship)
    end
  end

  def show(conn, %{"id" => id}) do
    friendship = Friendships.get_friendship!(id)
    render(conn, :show, friendship: friendship)
  end

  def accept_friend_request(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)
    friendship = Friendships.get_friendship!(String.to_integer(id))

    FriendshipsPolicy.accept_request(conn, friendship, current_user.id)

    with {:ok, %Friendship{} = friendship} <-
           Friendships.accept_friend_request(friendship) do
      render(conn, :show, friendship: friendship)
    end
  end

  def reject_friend_request(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)
    friendship = Friendships.get_friendship!(String.to_integer(id))

    FriendshipsPolicy.reject_request(conn, friendship, current_user.id)

    with {:ok, %Friendship{} = friendship} <-
           Friendships.decline_friend_request(friendship) do
      render(conn, :show, friendship: friendship)
    end
  end

  def friend_requests(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)

    page = Map.get(params, :per, "1") |> String.to_integer()
    per = Map.get(params, :page, "20") |> String.to_integer()
    type = Map.get(params, :type, "sent")

    requests =
      case type do
        :sent -> Friendships.sent_friend_requests(current_user.id, page: page, per: per)
        :received -> Friendships.recieved_friend_requests(current_user.id, page: page, per: per)
      end

    render(conn, :index, friendships: requests)
  end

  def delete(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    friendship = Friendships.get_friendship!(String.to_integer(id))

    FriendshipsPolicy.unfriend(conn, friendship, current_user.id)

    with {:ok, %Friendship{}} <- Friendships.unfriend(friendship) do
      send_resp(conn, :no_content, "")
    end
  end
end
