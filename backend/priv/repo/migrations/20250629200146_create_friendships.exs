defmodule Backend.Repo.Migrations.CreateFriendships do
  use Ecto.Migration

  def change do
    create table(:friendships) do
      add :status, :string
      add :user_id, references(:users, on_delete: :nothing), null: false 
      add :friend_id, references(:users, on_delete: :nothing), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:friendships, [:user_id])
    create index(:friendships, [:friend_id])
    create unique_index(:friendships, [:user_id, :friend_id],
                      name: :unique_friend_pair)
  end
end
