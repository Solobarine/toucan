defmodule Backend.Repo.Migrations.ChangeNullabilityOfUsername do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :username, :string, null: true
    end
  end
end
