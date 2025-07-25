defmodule Backend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      BackendWeb.Telemetry,
      Backend.Repo,
      {DNSCluster, query: Application.get_env(:backend, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Backend.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Backend.Finch},
      # Start a worker by calling: Backend.Worker.start_link(arg)
      # {Backend.Worker, arg},
      # Start to serve requests, typically the last entry
      BackendWeb.Endpoint,
      {Oban, Application.fetch_env!(:backend, Oban)},
      {PlugAttack.Storage.Ets, name: BackendWeb.Plugs.RateLimiter.Storage, clean_period: 60_000}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Backend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    BackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
