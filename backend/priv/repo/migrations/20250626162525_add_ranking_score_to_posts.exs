defmodule Backend.Repo.Migrations.AddRankingScoreToPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :ranking_score, :float, default: 0.0
    end
  end
end
