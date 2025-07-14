defmodule Backend.Repo.Migrations.BackfillUsernamesForUsers do
  use Ecto.Migration

  def up do
    repo().query!("""
    UPDATE users
    SET username = 'user_' || id
    WHERE username IS NULL
    """)
  end

  def down do
    # Optional: clear usernames that were generated
    repo().query!("""
    UPDATE users
    SET username = NULL
    WHERE username LIKE 'user_%'
    """)
  end
end
