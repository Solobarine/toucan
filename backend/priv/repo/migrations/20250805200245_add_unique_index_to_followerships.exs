defmodule Backend.Repo.Migrations.AddUniqueIndexToFollowerships do
  use Ecto.Migration

  def change do
    create unique_index(:followerships, [:follower_id, :followee_id], name: :unique_followership)
  end
end
