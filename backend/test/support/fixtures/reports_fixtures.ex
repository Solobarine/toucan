defmodule Backend.ReportsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Reports` context.
  """
  alias Backend.PostsFixtures
  alias Backend.AccountsFixtures

  def valid_attrs(attrs \\ %{}) do
    user_id = Map.get(attrs, :user_id) || AccountsFixtures.user_fixture().id
    post = PostsFixtures.post_fixture()

    %{
      user_id: user_id,
      content_type: "post",
      content_id: post.id,
      reason: "Hate Speech",
      description: nil
    }
  end

  @doc """
  Generate a report.
  """
  def report_fixture(attrs \\ %{}) do
    {:ok, report} =
      attrs
      |> valid_attrs()
      |> Backend.Reports.create_report()

    report
  end
end
