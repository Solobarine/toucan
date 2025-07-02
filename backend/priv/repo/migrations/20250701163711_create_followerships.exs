defmodule Backend.Repo.Migrations.CreateFollowerships do
  use Ecto.Migration

  def change do
    create table(:followerships) do
      add :follower_id, references(:users, on_delete: :nothing), null: false
      add :followee_id, references(:users, on_delete: :nothing), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:followerships, [:follower_id])
    create index(:followerships, [:followee_id])
  end
end
