defmodule Backend.Workers.NotificationWorker do
  use Oban.Worker, queue: :notifications

  alias Backend.Notifications

  @impl Oban.Worker
  def perform(%Oban.Job{args: args}) do
    IO.inspect(args, label: "Job Args")

    case args["action"] do
      "single" ->
        Notifications.notify_user(%{
          user_id: args["content_owner_id"],
          actor_id: args["user_id"],
          verb: args["verb"],
          object: args["object"],
          metadata: args["metadata"]
        })

      "multiple" ->
        Notifications.notify_users(args["user_id"], args["content_owner_id"],
          verb: args["verb"],
          object: args["object"],
          metadata: args["metadata"]
        )

      _ ->
        IO.inspect("Unknown action", label: "Oban Job")
    end

    :ok
  end
end
