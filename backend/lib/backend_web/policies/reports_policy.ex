defmodule BackendWeb.Policies.ReportsPolicy do
  alias BackendWeb.ErrorResponse

  def create(content_owner_id, user_id) do
    if content_owner_id == user_id do
      {:error, :cannot_report_own_content}
    else
      :ok
    end
  end
end
