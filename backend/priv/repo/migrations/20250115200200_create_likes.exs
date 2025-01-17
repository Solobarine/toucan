defmodule Backend.Repo.Migrations.CreateLikes do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :content_id, :integer
      add :content_type, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:likes, [:user_id])
  end
end
