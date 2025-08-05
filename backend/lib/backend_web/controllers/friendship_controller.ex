defmodule BackendWeb.FriendshipController do
  use BackendWeb, :controller

  alias Backend.Workers.NotificationWorker
  alias Backend.Accounts
  alias BackendWeb.Policies.FriendshipsPolicy
  alias Backend.Friendships
  alias Backend.Friendships.Friendship

  action_fallback BackendWeb.FallbackController

  def index(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)

    page = Map.get(params, "page", "1") |> String.to_integer()
    per = Map.get(params, "per", "20") |> String.to_integer()
    user_id = Map.get(params, "user_id", current_user.id)

    friends = Friendships.friends(user_id, page: page, per: per)
    json(conn, %{data: friends})
  end

  def create(conn, %{"friendship" => %{"friend_id" => fid}}) do
    current_user = Guardian.Plug.current_resource(conn)

    FriendshipsPolicy.create(conn, current_user.id, fid)

    with {:ok, %Friendship{} = friendship} <-
           Friendships.send_friend_request(current_user.id, fid, :pending) do
      %{
        action: "single",
        content_owner_id: fid,
        user_id: current_user.id,
        verb: "friend_request",
        metadata: %{},
        object: %{}
      }
      |> NotificationWorker.new()
      |> Oban.insert()

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
    id = id |> String.to_integer()
    friendship = Friendships.get_pending_friendship!(id, current_user.id)

    FriendshipsPolicy.accept_request(conn, friendship, current_user.id)

    with {:ok, %Friendship{} = friendship} <-
           Friendships.accept_friend_request(friendship) do
      render(conn, :show, friendship: friendship)
    end
  end

  def reject_friend_request(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)
    id = id |> String.to_integer()
    friendship = Friendships.get_pending_friendship!(id, current_user.id)

    FriendshipsPolicy.reject_request(conn, friendship, current_user.id)

    with {:ok, %Friendship{} = friendship} <-
           Friendships.delete_friendship(friendship) do
      render(conn, :show, friendship: friendship)
    end
  end

  def cancel_friend_request(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)
    friendship = Friendships.get_pending_friendship!(id, current_user.id)

    FriendshipsPolicy.cancel_friend_request(conn, friendship, current_user.id)

    with {:ok, %Friendship{}} <- Friendships.delete_friendship(friendship) do
      send_resp(conn, :no_content, "")
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

  def friends_suggestions(conn, %{"id" => id, "limit" => limit}) do
    user = Accounts.get_user!(id |> String.to_integer())

    suggestions = Friendships.friends_suggestions(user.id, limit |> String.to_integer())
    json(conn, suggestions)
  end

  def delete(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    friendship = Friendships.get_friendship!(String.to_integer(id))

    FriendshipsPolicy.unfriend(conn, friendship, current_user.id)

    with {:ok, %Friendship{}} <- Friendships.unfriend(friendship) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete(conn, %{"friend_id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    with {:ok, _friend} <- Friendships.unfriend(id, current_user.id) do
      conn |> put_status(:ok) |> json(%{message: "Friendship terminated"})
    end
  end
end
