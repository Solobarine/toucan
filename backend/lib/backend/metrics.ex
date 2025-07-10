defmodule Backend.Metrics do
  @moduledoc false

  import Ecto.Query, warn: false

  alias Backend.Repo
  alias Backend.Accounts.User

  @doc """
  Return a map of metrics for a single user (friends, followers, following, posts, reposts).
  """
  def user_metrics(%User{id: id}) do
    query =
      from u in User,
        where: u.id == ^id,
        select: %{
          friends_count:
            fragment(
              "(SELECT count(*) FROM friendships f
                WHERE f.status = 'accepted'
                  AND (f.user_id = ? OR f.friend_id = ?))",
              ^id,
              ^id
            ),
          followers_count:
            fragment(
              "(SELECT count(*) FROM followerships fs WHERE fs.followee_id = ?)",
              ^id
            ),
          following_count:
            fragment(
              "(SELECT count(*) FROM followerships fs WHERE fs.follower_id = ?)",
              ^id
            ),
          posts_count:
            fragment(
              "(SELECT count(*) FROM posts p WHERE p.user_id = ?)",
              ^id
            ),
          reposts_count:
            fragment(
              "(SELECT count(*) FROM reposts r WHERE r.user_id = ?)",
              ^id
            )
        }

    Repo.one!(query)
    |> then(&Map.put(&1, :total_posts, &1.posts_count + &1.reposts_count))
    |> Map.put(:user_id, id)
  end
end
