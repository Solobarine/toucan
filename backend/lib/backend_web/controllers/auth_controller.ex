defmodule BackendWeb.AuthController do
  @moduledoc """
  Authentication Controller
  """
  use BackendWeb, :controller
  alias BackendWeb.UserJSON
  alias Backend.Oauth
  alias BackendWeb.ErrorResponse
  alias Backend.Guardian
  alias Backend.Accounts
  alias Backend.Users

  @doc """
  Register User
  """
  def register(conn, %{
        "first_name" => first_name,
        "last_name" => last_name,
        "email" => email,
        "password_hash" => password,
        "tos" => tos
      }) do
    case Accounts.register(%{
           "first_name" => first_name,
           "last_name" => last_name,
           "username" => Users.generate_unique_username(),
           "email" => email,
           "password_hash" => password,
           "tos" => tos
         }) do
      {:ok, user} ->
        token = Guardian.generate_jwt(user)
        json(conn, %{token: token})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{
          errors:
            Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
              # Formats errors with `:error` messages
              Enum.reduce(opts, msg, fn {key, value}, acc ->
                String.replace(acc, "%{#{key}}", to_string(value))
              end)
            end)
        })
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
        conn |> put_status(200) |> json(UserJSON.show(%{user: user}))
    end
  end

  def profile(conn, _params) do
    id = conn.params["user_id"]

    user =
      if id do
        Accounts.get_user!(id)
      else
        Guardian.Plug.current_resource(conn)
      end

    render(conn, :index, user: user)
  end

  @doc """
  Log a User Out by invalidating token
  """
  def logout(conn, _) do
    conn
    |> Guardian.Plug.sign_out()
    |> json(%{message: "Logged Out Successfully"})
  end

  @doc """
  Oauth Authentication
  """
  def oauth(conn, params) do
    provider = params["provider"]
    code = params["code"]
    uri = client_uri()

    case provider do
      "google" ->
        case Oauth.google_oauth(code, provider) do
          {:ok, token} ->
            redirect(conn, external: "#{uri}/callback?token=#{token}")

          {:error, _reason} ->
            redirect(conn, external: "#{uri}/login?error=Unable to authenticate user")
        end

      "github" ->
        case Oauth.github_oauth(code, provider) do
          {:ok, token} ->
            redirect(conn, external: "#{uri}/callback?token=#{token}")

          {:error, reason} ->
            redirect(conn, external: "#{uri}/login?error=#{reason}")
        end

      _ ->
        raise ErrorResponse.BadRequest
    end
  end

  defp client_uri do
    Application.fetch_env!(:backend, :client_uri)
  end
end
