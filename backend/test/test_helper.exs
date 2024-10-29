ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(Backend.Repo, :manual)
Enum.each(Path.wildcard("test/support/**/*.exs"), &Code.require_file/1)
