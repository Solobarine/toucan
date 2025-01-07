defmodule BackendWeb.ErrorResponse.Forbidden do
  defexception [message: "No access to this resource", plug_status: 403]
end
