defmodule Backend.AuthControllerTest do
  use BackendWeb.ConnCase, async: true
  alias Backend.Accounts
  alias Backend.Guardian

  @valid_attrs %{
    first_name: FakerElixir.Name.first_name(),
    last_name: FakerElixir.Name.last_name(),
    username: "example",
    email: "user@example.com",
    password_hash: "password123"
  }
  @invalid_attrs %{first_name: "", last_name: "", email: "invalid_email", password_hash: "", username: ""}

  describe "POST /register" do
    test "registers a new user with valid data", %{conn: conn} do
      conn = post(conn, ~p"/api/register", @valid_attrs)
      assert json_response(conn, 200)["token"]
    end

    test "does not register a new user with invalid data", %{conn: conn} do
      conn = post(conn, ~p"/api/register", @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "POST /login" do
    setup do
      {:ok, user} = Accounts.register(@valid_attrs)
      %{user: user}
    end

    test "logs in a user with valid credentials", %{conn: conn} do
      conn =
        post(conn, ~p"/api/login", %{
          email: @valid_attrs.email,
          password: @valid_attrs.password_hash
        })

      assert json_response(conn, 200)["token"]
    end

    test "does not log in a user with invalid credentials", %{conn: conn} do
      conn =
        post(conn, ~p"/api/login", %{
          email: "wrong@example.com",
          password: "password123"
        })

      assert json_response(conn, 401)["error"] == "Invalid Credentials"
    end
  end

  describe "DELETE /logout" do
    setup do
      {:ok, user} = Accounts.register(@valid_attrs)
      {:ok, token, _claims} = Guardian.encode_and_sign(user)
      %{token: token}
    end

    test "logs out a user successfully", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = delete(conn, ~p"/api/logout")
      assert json_response(conn, 200)["message"] == "Logged Out Successfully"
    end
  end
end
