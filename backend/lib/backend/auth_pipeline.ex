defmodule BackendWeb.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :backend,
    module: Backend.Guardian,
    error_handler: Backend.AuthErrorHandler

  # Ensure there is a token in the Authorization header
  plug Guardian.Plug.VerifyHeader, realm: "Bearer"

  # Load the resource (user) if a valid token exists
  plug Guardian.Plug.LoadResource
end
