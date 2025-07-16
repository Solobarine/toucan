defmodule Backend.Oauth do
  alias Backend.Users
  alias Backend.Accounts
  alias BackendWeb.Endpoint
  alias Backend.Accounts.User
  alias Backend.Repo

  @github_client_id System.get_env("GITHUB_CLIENT_ID")
  @github_client_secret System.get_env("GITHUB_CLIENT_SECRET")
  @google_client_id System.get_env("GOOGLE_CLIENT_ID")
  @google_client_secret System.get_env("GOOGLE_CLIENT_SECRET")

  def google_oauth(code, provider) do
    google_token_url = "https://oauth2.googleapis.com/token"
    google_user_url = "https://www.googleapis.com/oauth2/v3/userinfo"

    body =
      URI.encode_query(%{
        code: code,
        client_id: @google_client_id,
        client_secret: @google_client_secret,
        grant_type: "authorization_code",
        redirect_uri: "#{Endpoint.url()}/api/oauth/google"
      })

    headers = [
      {"Content-Type", "application/x-www-form-urlencoded"},
      {"Accept", "application/json"}
    ]

    case HTTPoison.post(google_token_url, body, headers) do
      {:ok, response} ->
        {:ok, decoded_body} = Jason.decode(response.body)

        case decoded_body do
          %{"access_token" => _access_token, "scope" => _scope, "token_type" => _token_type} ->
            get_user(decoded_body, provider, google_user_url)

          %{"error" => error} ->
            {:error, error}
        end

      {:error, reason} ->
        {:error, reason}
    end
  end

  def github_oauth(code, provider) do
    github_token_url = "https://github.com/login/oauth/access_token"
    github_user_url = "https://api.github.com/user"

    body =
      URI.encode_query(%{
        code: code,
        client_id: @github_client_id,
        client_secret: @github_client_secret
      })

    headers = [
      {"Content-Type", "application/x-www-form-urlencoded"},
      {"Accept", "application/json"}
    ]

    case HTTPoison.post(github_token_url, body, headers) do
      {:ok, response} ->
        {:ok, body} = Jason.decode(response.body)

        case body do
          %{"access_token" => _access_token, "scope" => _scope, "token_type" => _token_type} ->
            get_user(body, provider, github_user_url)

          %{"error" => error} ->
            {:error, error}
        end

      {:error, reason} ->
        {:error, reason}
    end
  end

  def get_user(response, provider, user_url) do
    %{"access_token" => access_token, "scope" => _scope, "token_type" => token_type} = response

    case provider do
      "github" ->
        case HTTPoison.get(user_url, [
               {"Authorization", "#{String.capitalize(token_type)} #{access_token}"}
             ]) do
          {:ok, response} ->
            {:ok, decoded_body} = Jason.decode(response.body)
            authenticate_user(decoded_body, provider)

          {:error, _} ->
            {:error, "Something went wrong"}
        end

      "google" ->
        case HTTPoison.get(user_url, [{"Authorization", "#{token_type} #{access_token}"}]) do
          {:ok, response} ->
            {:ok, decoded_body} = Jason.decode(response.body)
            authenticate_user(decoded_body, provider)

          {:error, reason} ->
            {:error, reason}
        end
    end
  end

  def authenticate_user(user, provider) do
    case Repo.get_by(User, email: user["email"]) do
      nil ->
        {:ok, user} =
          case provider do
            "github" -> github_user(user)
            "google" -> google_user(user)
          end

        token = Accounts.generate_jwt(user)
        {:ok, token}

      user ->
        IO.inspect(user, label: "User")
        token = Accounts.generate_jwt(user)
        {:ok, token}
    end
  end

  def google_user(user) do
    username = Users.generate_unique_username()

    attrs =
      case user["name"] do
        nil ->
          %{
            first_name: username,
            last_name: nil,
            avatar: user["picture"],
            email: user["email"],
            username: username,
            tos: true,
            password_hash: Bcrypt.hash_pwd_salt(UUID.uuid4())
          }

        _name ->
          %{
            first_name: user["given_name"],
            last_name: user["family_name"],
            avatar: user["picture"],
            email: user["email"],
            username: username,
            tos: true,
            password_hash: Bcrypt.hash_pwd_salt(UUID.uuid4())
          }
      end

    %User{}
    |> User.oauth_changeset(attrs)
    |> Repo.insert()
  end

  def github_user(user) do
    username = Users.generate_unique_username()
    password_hash = Bcrypt.hash_pwd_salt(UUID.uuid4())

    attrs =
      case user["name"] do
        nil ->
          %{
            first_name: user["username"],
            last_name: nil,
            email: user["email"],
            avatar: user["avatar_url"],
            username: username,
            tos: true,
            password_hash: password_hash
          }

        name ->
          names = name |> String.split()

          {first_name, last_name} =
            case names do
              [a] -> {a, nil}
              [a | rest] -> {a, List.last(rest)}
            end

          %{
            first_name: first_name,
            last_name: last_name,
            email: user["email"],
            avatar: user["avatar_url"],
            username: username,
            tos: true,
            password_hash: password_hash
          }
      end

    %User{}
    |> User.oauth_changeset(attrs)
    |> Repo.insert!()
  end
end
