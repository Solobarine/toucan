defmodule Backend.Repo.Migrations.CreateChats do
  use Ecto.Migration

  def change do
    create table(:chats) do
      add :name, :string
      add :sender_id, references(:users, on_delete: :nothing)
      add :receiver_id, references(:users, on_delete: :nothing)
      add :message, :text

      timestamps(type: :utc_datetime)
    end

    create index(:chats, [:name])
    create index(:chats, [:sender_id])
    create index(:chats, [:receiver_id])
  end
end
