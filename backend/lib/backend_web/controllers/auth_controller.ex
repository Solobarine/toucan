
defmodule BackendWeb.AuthController do
  @moduledoc """
  Authentication Controller
  """
  use BackendWeb, :controller
  alias Backend.Guardian
  alias Backend.Accounts

  @doc """
  Register User
  """
  def register(conn, %{"first_name" => first_name, "last_name" => last_name, "username" => username,"email" => email, "password_hash" => password}) do
    case Accounts.register(%{"first_name" => first_name, "last_name" => last_name, "username" => username,"email" => email, "password_hash" => password}) do
      {:ok, user} ->
        token = Guardian.generate_jwt(user)
        json(conn, %{token: token})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset.errors})
    end
  end

  @doc """
  Authenticate and Log a User in.
  """
  def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate(email, password) do
      {:ok, user} ->
        token = Guardian.generate_jwt(user)
        json(conn, %{token: token})

      {:error, _changeset} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Invalid Credentials"})
    end
  end

  def me(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    case user do
      nil ->
        conn |> put_status(401) |> json(%{error: "Unauthorized"})

      _ ->
        conn |> put_status(200) |> json(%{user: user})
    end
  end

  @doc """
  Log a User Out by invalidating token
  """
  def logout(conn, _) do
    conn
    |> Guardian.Plug.sign_out()
    |> json(%{message: "Logged Out Successfully"})
  end
end
