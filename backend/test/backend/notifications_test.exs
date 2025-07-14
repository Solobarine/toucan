defmodule Backend.NotificationsTest do
  use Backend.DataCase

  alias Backend.Notifications

  describe "notifications" do
    alias Backend.Notifications.Notification

    import Backend.NotificationsFixtures

    @invalid_attrs %{metadata: nil, verb: nil, object: nil, read_at: nil}

    test "get_notification!/1 returns the notification with given id" do
      notification = notification_fixture()
      assert Notifications.get_notification!(notification.id) == notification
    end

    test "delete_notification/1 deletes the notification" do
      notification = notification_fixture()
      assert {:ok, %Notification{}} = Notifications.delete_notification(notification)
      assert_raise Ecto.NoResultsError, fn -> Notifications.get_notification!(notification.id) end
    end

    test "change_notification/1 returns a notification changeset" do
      notification = notification_fixture()
      assert %Ecto.Changeset{} = Notifications.change_notification(notification)
    end
  end
end
