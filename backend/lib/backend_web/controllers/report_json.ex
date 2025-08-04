defmodule BackendWeb.ReportJSON do
  alias BackendWeb.UserJSON
  alias Backend.Reports.Report

  def index(%{reports: reports}) do
    %{reports: for(report <- reports, do: data(report))}
  end

  def show(report) do
    %{report: data(report)}
  end

  defp data(report) do
    %{
      id: report.id,
      reason: report.reason,
      description: report.description,
      status: report.status,
      user_id: report.user_id,
      user: UserJSON.show(%{user: report.user}).user
    }
  end
end
