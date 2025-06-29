defmodule Backend.Repo.Migrations.AddIndexForLikesContentId do
  use Ecto.Migration

  def change do
    create index(:likes, [:content_id, :content_type])
  end
end
