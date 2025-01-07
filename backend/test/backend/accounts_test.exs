defmodule Backend.AccountsTest do
  use Backend.DataCase

  alias Backend.Accounts

  import Backend.AccountsFixtures

  @valid_attrs %{
    username: "art",
    first_name: FakerElixir.Name.first_name(),
    last_name: FakerElixir.Name.last_name(),
    email: FakerElixir.Internet.email(),
    password_hash: "password123"
  }
  @invalid_attrs %{username: nil, first_name: nil, last_name: nil, email: nil, password_hash: nil}

  describe "users" do
    alias Backend.Accounts.User

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{
        username: "some username",
        first_name: "some first_name",
        last_name: "some last_name",
        email: "some email",
        password_hash: "some password_hash"
      }

      assert {:ok, %User{} = user} = Accounts.create_user(valid_attrs)
      assert user.username == "some username"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert user.email == "some email"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()

      update_attrs = %{
        username: "some updated username",
        first_name: "some updated first_name",
        last_name: "some updated last_name",
        email: "some updated email",
        password_hash: "some updated password_hash"
      }

      assert {:ok, %User{} = user} = Accounts.update_user(user, update_attrs)
      assert user.username == "some updated username"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "register/1" do
    test "registers a user with valid attributes" do
      assert {:ok, user} = Accounts.register(@valid_attrs)
      assert user.email == @valid_attrs.email
      assert Bcrypt.verify_pass("password123", user.password_hash)
    end

    test "does not register a user with invalid attributes" do
      assert {:error, changeset} = Accounts.register(@invalid_attrs)
      assert %{email: ["can't be blank"]} = errors_on(changeset)
    end

    test "does not register a user with an existing email" do
      {:ok, _user} = Accounts.register(@valid_attrs)
      assert {:error, changeset} = Accounts.register(@valid_attrs)
      assert %{email: ["has already been taken"]} = errors_on(changeset)
    end
  end

  describe "authenticate_user/2" do
    setup do
      {:ok, user} = Accounts.register(@valid_attrs)
      %{user: user}
    end

    test "authenticates with valid credentials", %{user: user} do
      assert {:ok, ^user} = Accounts.authenticate(@valid_attrs.email, "password123")
    end

    test "does not authenticate with invalid email" do
      assert {:error, :invalid_credentials} =
               Accounts.authenticate("wrong@example.com", "password123")
    end

    test "does not authenticate with invalid password", %{user: _user} do
      assert {:error, :invalid_credentials} =
               Accounts.authenticate("user@example.com", "wrongpassword")
    end
  end

  describe "generate_token/1" do
    setup do
      {:ok, user} = Accounts.register(@valid_attrs)
      %{user: user}
    end

    test "generates a JWT token for a valid user", %{user: user} do
      token = Accounts.generate_jwt(user)
      assert is_binary(token)
    end
  end
end
