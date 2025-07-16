defmodule Backend.Repo.Migrations.MakeLastNameNullable do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :last_name, :string, null: true
    end
  end
end
