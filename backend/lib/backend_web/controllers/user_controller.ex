defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.Accounts

  action_fallback BackendWeb.FallbackController

  def show(conn, %{"id" => id}) do
    current_user = Guardian.Plug.current_resource(conn)

    id = id |> String.to_integer()

    user = Accounts.get_full_user_details(id, current_user.id)

    # render(conn, :show, user: user)
    json(conn, %{user: user})
  end
end
