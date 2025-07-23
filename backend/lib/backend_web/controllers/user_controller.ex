defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias BackendWeb.Policies.UsersPolicy
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

    UsersPolicy.show(conn, id, current_user.id)

    user = Accounts.get_full_user_details(id, current_user.id)

    json(conn, %{user: user})
  end

  def update_profile(conn, %{"user" => user_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    case Accounts.update_user(current_user, user_params) do
      {:ok, _user} ->
        json(conn, %{message: "Profile updated successfully"})

      {:error, changeset} ->
        conn |> put_status(:unprocessable_entity) |> render("error.json", changeset: changeset)
    end
  end

  def update_password(conn, %{
        "user" => %{
          "current_password" => current_password,
          "new_password" => new_password,
          "confirm_password" => _confirm_password
        }
      }) do
    current_user = Guardian.Plug.current_resource(conn)

    case Accounts.update_password(current_user, current_password, new_password) do
      {:ok, _user} ->
        conn |> put_status(:ok) |> json(%{message: "Password Updated Successfully"})

      {:error, _reason} ->
        conn |> put_status(:unprocessable_entity) |> json(%{error: "Invalid Credentials"})
    end
  end
end
