defmodule Backend.Repo.Migrations.CreateUserBlocks do
  use Ecto.Migration

  def change do
    create table(:user_blocks) do
      add :blocker_id, references(:users, on_delete: :nothing)
      add :blocked_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:user_blocks, [:blocker_id])
    create index(:user_blocks, [:blocked_id])
    create unique_index(:user_blocks, [:blocker_id, :blocked_id], name: :unique_blocker_blocked)
  end
end
