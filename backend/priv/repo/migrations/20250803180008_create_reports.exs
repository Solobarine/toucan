defmodule Backend.Repo.Migrations.CreateReports do
  use Ecto.Migration

  def change do
    create table(:reports) do
      add :reason, :string
      add :description, :text
      add :content_type, :string, null: false
      add :content_id, :integer, null: false
      add :user_id, references(:users, on_delete: :delete_all)
      add :reviewed_by_id, references(:users, on_delete: :delete_all)
      add :reviewed_at, :utc_datetime
      add :status, :string, default: "pending"

      timestamps(type: :utc_datetime)
    end

    create index(:reports, [:user_id])
  end
end
