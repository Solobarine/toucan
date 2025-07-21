defmodule Backend.UserBlocksTest do
  alias Backend.AccountsFixtures
  use Backend.DataCase

  alias Backend.UserBlocks

  describe "userblocks" do
    alias Backend.UserBlocks.UserBlock

    import Backend.UserBlocksFixtures

    @invalid_attrs %{}

    test "list_userblocks/0 returns all userblocks" do
      user_block = user_block_fixture()
      assert length(UserBlocks.list_user_blocks(user_block.blocker_id)) == 1
    end

    test "create_user_block/1 with valid data creates a user_block" do
      user = AccountsFixtures.user_fixture()
      user2 = AccountsFixtures.user_fixture()
      valid_attrs = %{blocker_id: user.id, blocked_id: user2.id}

      assert {:ok, %UserBlock{} = user_block} = UserBlocks.create_user_block(valid_attrs)
    end

    test "create_user_block/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserBlocks.create_user_block(@invalid_attrs)
    end

    test "delete_user_block/1 deletes the user_block" do
      user_block = user_block_fixture()
      assert {:ok, %UserBlock{}} = UserBlocks.delete_user_block(user_block)
      assert_raise Ecto.NoResultsError, fn -> UserBlocks.get_user_block!(user_block.id) end
    end

    test "change_user_block/1 returns a user_block changeset" do
      user_block = user_block_fixture()
      assert %Ecto.Changeset{} = UserBlocks.change_user_block(user_block)
    end
  end
end
