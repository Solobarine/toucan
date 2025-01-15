defmodule Backend.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :text, :text
      add :user_id, references(:users, on_delete: :nothing)
      add :content_id, :integer, null: false
      add :content_type, :string, null: false

      timestamps(type: :utc_datetime)
    end

    create index(:comments, [:content_id, :content_type])
    create index(:comments, [:user_id])
  end
end
