defmodule BackendWeb.AuthJSON do
  alias Backend.Posts

  def index(%{user: user}) do
    %{
      profile: %{
        followers: 0,
        following: 0,
        posts_count: Posts.count_posts(user.id),
        activity: []
      }
    }
  end
end
