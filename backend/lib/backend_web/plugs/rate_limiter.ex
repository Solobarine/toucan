defmodule BackendWeb.Plugs.RateLimiter do
  import Plug.Conn
  import Phoenix.Controller
  use PlugAttack

  alias PlugAttack.Storage.Ets
  @storage {Ets, BackendWeb.Plugs.RateLimiter.Storage}

  # Normalize user id or IP to string
  defp user_or_ip(conn) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn.remote_ip |> Tuple.to_list() |> Enum.join(".")

      user ->
        to_string(user.id)
    end
  end

  ## -- POSTS: Limit to 5 per minute --
  rule "limit post creation", conn do
    if conn.method == "POST" and conn.request_path == "/api/posts" do
      throttle(user_or_ip(conn), period: 60_000, limit: 5, storage: @storage)
    end
  end

  ## -- COMMENTS: Limit to 10 per minute --
  rule "limit comment creation", conn do
    if conn.method == "POST" and
         Regex.match?(~r|^/api/posts/[A-Za-z0-9\-]+/comments$|, conn.request_path) do
      throttle(user_or_ip(conn), period: 60_000, limit: 10, storage: @storage)
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
      throttle(user_or_ip(conn), period: 60_000, limit: 10, storage: @storage)
    end
  end

  ## -- GLOBAL fallback: 100 per minute --
  rule "global fallback", conn do
    throttle(user_or_ip(conn), period: 60_000, limit: 100, storage: @storage)
  end

  ## Actions
  def allow_action(conn, _data, _opts), do: conn

  def block_action(conn, _data, _opts) do
    conn
    |> put_resp_content_type("application/json")
    |> put_status(:too_many_requests)
    |> json(%{error: "Too many requests. Please try again later."})
    |> halt()
  end

  ## Final init & call
  def init(opts), do: opts
  def call(conn, opts), do: super(conn, opts)
end
