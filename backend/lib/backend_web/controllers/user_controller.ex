defmodule BackendWeb.UserController do
  alias Backend.Accounts
  use BackendWeb, :controller

  action_fallback BackendWeb.FallbackController

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    render(conn, :show, user: user)
  end
end
