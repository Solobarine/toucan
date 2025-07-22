defmodule BackendWeb.Plugs.RateLimiter do
  import Plug.Conn
  use PlugAttack

  alias PlugAttack.Storage.Ets
  @storage {Ets, BackendWeb.Plugs.RateLimiter.Storage}

  defp user_or_ip(conn) do
    current_user = Guardian.Plug.current_resource(conn)

    if is_nil(current_user) do
      conn.remote_ip |> Tuple.to_list() |> Enum.join(".")
    else
      current_user.id
    end
  end

  ## -- POSTS: Limit to 3 per minute --
  rule "limit post creation", conn do
    if conn.method == "POST" and conn.request_path == "/api/posts" do
      throttle(user_or_ip(conn), period: 60_000, limit: 3, storage: @storage)
    end
  end

  ## -- COMMENTS: Limit to 10 per minute --
  rule "limit comment creation", conn do
    if conn.method == "POST" and Regex.match?(~r|^/api/posts/\d+/comments$|, conn.request_path) do
      throttle(user_or_ip(conn), period: 60_000, limit: 20, storage: @storage)
    end
  end

  ## -- LIKES: Limit to 20 per minute --
  rule "limit likes", conn do
    if conn.method == "POST" and String.starts_with?(conn.request_path, "/api/likes") do
      throttle(user_or_ip(conn), period: 60_000, limit: 20, storage: @storage)
    end
  end

  ## -- REPORTS: Limit to 10 per minute --
  rule "limit reports", conn do
    if conn.method == "POST" and String.contains?(conn.request_path, "/report") do
      throttle(user_or_ip(conn), period: 60_000, limit: 20, storage: @storage)
    end
  end

  rule "global fallback", conn do
    throttle(user_or_ip(conn), period: 60_000, limit: 10, storage: @storage)
  end

  def allow_action(conn, _data, _opts) do
    conn
  end

  def block_action(conn, _data, _opts) do
    conn |> send_resp(:forbidden, "Forbidden/n") |> halt()
  end

  ## Final init & call
  def init(opts), do: opts
  def call(conn, opts), do: super(conn, opts)
end
