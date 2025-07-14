defmodule Backend.NotificationsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Notifications` context.
  """

  @doc """
  Generate a notification.
  """
  def notification_fixture(attrs \\ %{}) do
    defaults = %{
      metadata: %{},
      object: %{},
      verb: "some verb",
      read_at: nil
    }

    params = Map.merge(defaults, attrs)

    {:ok, notification} = params |> Backend.Notifications.notify_user()

    notification
  end
end
