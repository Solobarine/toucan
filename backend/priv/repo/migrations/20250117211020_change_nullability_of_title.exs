defmodule Backend.Repo.Migrations.ChangeNullabilityOfTitle do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      modify :title, :string, null: true
    end
  end
end
