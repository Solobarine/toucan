defmodule Backend.Repo.Migrations.AddTosToUsersTable do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :tos, :boolean, null: false
    end
  end
end
