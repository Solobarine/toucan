defmodule BackendWeb.Policies.CommentsPolicies do
  alias BackendWeb.ErrorResponse

  def create(conn) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  def update(conn, comment) do
    current_user = Guardian.Plug.current_resource(conn)

    if current_user.id == comment.user_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  def delete(conn, comment) do
    update(conn, comment)
  end
end
