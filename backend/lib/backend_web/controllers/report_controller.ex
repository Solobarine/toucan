defmodule BackendWeb.ReportController do
  alias BackendWeb.Policies.ReportsPolicy
  alias Backend.Comments
  alias Backend.Posts
  alias Backend.Reports
  use BackendWeb, :controller

  action_fallback BackendWeb.FallbackController

  def index(conn, params) do
    status = Map.get(params, "status", "pending")
    reports = Reports.list_reports(status)

    render(conn, :index, reports: reports)
  end

  def show(conn, %{"id" => id}) do
    report = Reports.get_report!(id)

    render(conn, :show, report)
  end

  def create(conn, %{"report" => report_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    params = Map.merge(report_params, %{"user_id" => current_user.id})
    content_id = Map.get(report_params, "content_id")
    content_type = Map.get(report_params, "content_type")

    content_user_id =
      case content_type do
        "post" -> Posts.get_post!(content_id).user_id
        "comment" -> Comments.get_comment!(content_id).user_id
        _others -> nil
      end

    with :ok <- ReportsPolicy.create(content_user_id, current_user.id),
         {:ok, _report} <-
           Reports.create_report(params) do
      conn |> put_status(:created) |> json(%{"message" => "Content Reported Successfully"})
    end
  end
end
