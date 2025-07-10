defmodule BackendWeb.MetricsControllerTest do
  use BackendWeb.ConnCase

  import Backend.AccountsFixtures
  import Backend.Guardian

  alias Backend.Metrics

  @json "application/json"

  setup %{conn: conn} do
    # Authenticate any request that hits the API pipeline
    auth_user = user_fixture()
    {:ok, token, _claims} = encode_and_sign(auth_user)

    conn =
      conn
      |> put_req_header("accept", @json)
      |> put_req_header("authorization", "Bearer #{token}")

    %{conn: conn}
  end

  describe "GET /api/users/:user_id/metrics (show/2)" do
    test "responds 200 with the user’s metrics", %{conn: conn} do
      target_user = user_fixture()
      expected = Metrics.user_metrics(target_user)

      conn =
        conn
        |> get(~p"/api/users/#{target_user.id}/metrics")

      assert json_response(conn, 200) == expected
    end

    test "responds 404 when the user is not found", %{conn: conn} do
      nonexistent_id = -9_999

      conn =
        conn
        |> get(~p"/api/users/#{nonexistent_id}/metrics")

      # Your FallbackController turns Ecto.NoResultsError into a 404 JSON error
      assert json_response(conn, 404)["errors"]["detail"] in ["Not Found", "User not found"]
    end
  end
end
