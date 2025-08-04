defmodule Backend.Reports.Report do
  use Ecto.Schema
  import Ecto.Changeset

  alias Backend.Accounts.User

  schema "reports" do
    belongs_to :user, User
    belongs_to :reviewed_by, User, foreign_key: :reviewed_by_id

    field :reason, :string
    field :description, :string
    field :content_type, :string
    field :content_id, :integer
    field :reviewed_at, :utc_datetime
    field :status, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(report, attrs) do
    report
    |> cast(attrs, [:reason, :description, :content_type, :content_id, :user_id])
    |> validate_required([:reason, :content_type, :content_id, :user_id])
  end

  def reviewer_changeset(report, attrs) do
    report
    |> cast(attrs, [:reviewed_by_id])
    |> validate_required([:reviewed_by_id])
  end
end
