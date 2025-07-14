defmodule BackendWeb.ErrorResponse.BadRequest do
  defexception message: "Invalid request parameters", plug_status: 400
end

defmodule BackendWeb.ErrorResponse.Unauthorized do
  defexception message: "Authentication required", plug_status: 401
end

defmodule BackendWeb.ErrorResponse.Forbidden do
  defexception message: "No access to this resource", plug_status: 403
end

defmodule BackendWeb.ErrorResponse.NotFound do
  defexception message: "Resource not found", plug_status: 404
end

defmodule BackendWeb.ErrorResponse.Conflict do
  defexception message: "Conflict with current resource state", plug_status: 409
end

defmodule BackendWeb.ErrorResponse.UnprocessableEntity do
  defexception message: "Request cannot be processed", plug_status: 422
end

defmodule BackendWeb.ErrorResponse.InternalServerError do
  defexception message: "Unexpected server error", plug_status: 500
end
