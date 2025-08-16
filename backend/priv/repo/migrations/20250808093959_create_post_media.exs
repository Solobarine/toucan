defmodule Backend.Repo.Migrations.CreatePostMedia do
  use Ecto.Migration

  def change do
    create table(:post_media) do
      add :file, :string
      add :post_id, references(:posts, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:post_media, [:post_id])
  end
end
