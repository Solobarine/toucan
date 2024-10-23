defmodule Backend.AuthControllerTest do
  use Backend.ConnCase, async: true
  alias Backend.Accounts
  alias Backend.Guardian

  @valid_attrs %{email: "user@example.com", password: "password123"}
  @invalid_attrs %{email: "invalid_email", password: ""}

  describe "POST /register" do
    test "registers a new user with valid data", %{conn: conn} do
      conn = post(conn, Routes.auth_path(conn, :register), @valid_attrs)
      assert json_response(conn, 200)["token"]
    end

    test "does not register a new user with invalid data", %{conn: conn} do
      conn = post(conn, Routes.auth_path(conn, :register), @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "POST /login" do
    setup do
      {:ok, user} = Accounts.register_user(@valid_attrs)
      %{user: user}
    end

    test "logs in a user with valid credentials", %{conn: conn} do
      conn = post(conn, Routes.auth_path(conn, :login), @valid_attrs)
      assert json_response(conn, 200)["token"]
    end

    test "does not log in a user with invalid credentials", %{conn: conn} do
      conn = post(conn, Routes.auth_path(conn, :login), %{email: "wrong@example.com", password: "password123"})
      assert json_response(conn, 401)["error"] == "Invalid credentials"
    end
  end

  describe "DELETE /logout" do
    setup do
      {:ok, user} = Accounts.register_user(@valid_attrs)
      {:ok, token, _claims} = Guardian.encode_and_sign(user)
      %{token: token}
    end

    test "logs out a user successfully", %{conn: conn, token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = delete(conn, Routes.auth_path(conn, :logout))
      assert json_response(conn, 200)["message"] == "Logged out successfully"
    end
  end
end
