defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.Avatar
  alias Backend.Accounts

  action_fallback BackendWeb.FallbackController

  def update_avatar(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)

    IO.inspect(current_user.id, label: "Current User")

    avatar = params["avatar"]

    case Accounts.update_user(current_user, %{"avatar" => avatar}) do
      {:ok, user} ->
        json(conn, %{avatar: Avatar.url({user.avatar, user})})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    id = id |> String.to_integer()

    user = Accounts.get_full_user_details(id, current_user.id)

    # render(conn, :show, user: user)
    json(conn, %{user: user})
  end
end
