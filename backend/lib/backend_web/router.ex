defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug BackendWeb.AuthPipeline

    plug Guardian.Plug.Pipeline,
      module: Backend.Guardian,
      error_handler: BackendWeb.AuthErrorHandler

    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", BackendWeb do
    pipe_through :api

    post "/register", AuthController, :register
    post "/login", AuthController, :login
    delete "/logout", AuthController, :logout

    pipe_through [:auth]

    get "/me", AuthController, :me
    get "/profile", AuthController, :profile
    get "/user-posts", PostController, :user_posts
    get "/user/:id", UserController, :show
    resources "/posts", PostController, except: [:new, :edit]
    post "/posts/repost", PostController, :repost
    resources "/comments", CommentController, only: [:index, :create, :show, :update, :delete]
    post "/replies", CommentController, :create_reply
    resources "/chats", ChatController, except: [:new, :edit]
    resources "/likes", LikeController, only: [:create, :delete]

    post "/friendships/request", FriendshipController, :create
    put "/friendships/:id/accept", FriendshipController, :accept_friend_request
    put "/friendships/:id/block", FriendshipController, :reject_friend_request
    get "/friendships/requests", FriendshipController, :friend_requests
    delete "/friendships/:id", FriendshipController, :delete
    get "/friends", FriendshipController, :index
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:backend, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: BackendWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
