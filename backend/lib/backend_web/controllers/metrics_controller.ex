defmodule BackendWeb.MetricsController do
  use BackendWeb, :controller

  alias Backend.Metrics
  alias Backend.Accounts

  action_fallback BackendWeb.FallbackController

  def show(conn, %{"user_id" => user_id}) do
    user = Accounts.get_user!(user_id)
    metrics = Metrics.user_metrics(user)
    json(conn, metrics)
  end
end
