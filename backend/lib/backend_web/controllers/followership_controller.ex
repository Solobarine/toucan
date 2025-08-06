defmodule BackendWeb.FollowershipController do
  use BackendWeb, :controller

  alias Backend.Workers.NotificationWorker
  alias BackendWeb.Policies.FollowershipsPolicy
  alias Backend.Followerships
  alias Backend.Followerships.Followership

  action_fallback BackendWeb.FallbackController

  def create(conn, %{"followership" => followership_params}) do
    current_user = Guardian.Plug.current_resource(conn)
    followee_id = Map.get(followership_params, "followee_id")

    params =
      Map.merge(followership_params, %{
        "followee_id" => followee_id,
        "follower_id" => current_user.id
      })

    FollowershipsPolicy.create(conn, current_user.id, followee_id)

    with {:ok, %Followership{} = followership} <- Followerships.create_followership(params) do
      %{
        action: "single",
        content_owner_id: followee_id,
        user_id: current_user.id,
        verb: "follow",
        object: %{},
        metadata: %{}
      }
      |> NotificationWorker.new()
      |> Oban.insert()

      conn
      |> put_status(:created)
      |> render(:show, followership: followership)
    end
  end

  def followers(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    followers = Followerships.followers(current_user)
    render(conn, :index, followerships: followers, assoc: :followers)
  end

  def following(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    users_following = Followerships.following(current_user)

    render(conn, :index, followerships: users_following, assoc: :following)
  end

  def delete(conn, %{"id" => id}) do
    followership = Followerships.get_followership!(id)

    with {:ok, %Followership{}} <- Followerships.delete_followership(followership) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete(conn, %{"followee_id" => followee_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    followee_id = followee_id |> String.to_integer()

    case Followerships.delete_followership(current_user.id, followee_id) do
      {:ok, _followership} ->
        conn
        |> put_status(:ok)
        |> json(%{message: "Unfollowed user"})

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{errors: "Resource not found"})
    end
  end
end
