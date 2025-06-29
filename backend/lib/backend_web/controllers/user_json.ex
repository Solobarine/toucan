defmodule BackendWeb.UserJSON do
  alias Backend.Accounts.User

  def show(%{user: user}) do
    %{user: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      inserted_at: user.inserted_at
    }
  end
end
