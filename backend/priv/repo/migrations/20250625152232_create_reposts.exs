defmodule Backend.Repo.Migrations.CreateReposts do
  use Ecto.Migration

  def change do
    create table(:reposts) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :original_post_id, references(:posts, on_delete: :delete_all), null: false
      add :body, :text

      timestamps()
    end

    create index(:reposts, [:user_id])
    create index(:reposts, [:original_post_id])
    create unique_index(:reposts, [:user_id, :original_post_id])
  end
end
