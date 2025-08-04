defmodule Backend.ReportsTest do
  alias Backend.AccountsFixtures
  alias Backend.PostsFixtures
  use Backend.DataCase

  alias Backend.Reports

  setup do
    user = AccountsFixtures.user_fixture()
    %{user: user}
  end

  describe "reports" do
    alias Backend.Reports.Report

    import Backend.ReportsFixtures

    @invalid_attrs %{
      user_id: nil,
      reason: nil,
      description: nil,
      content_type: nil,
      content_id: nil
    }

    test "list_reports/0 returns all reports" do
      report = report_fixture()
      assert Reports.list_reports()
    end

    test "get_report!/1 returns the report with given id" do
      report = report_fixture()
      assert Reports.get_report!(report.id).id == report.id
    end

    test "create_report/1 with valid data creates a report", %{user: user} do
      post = PostsFixtures.post_fixture()

      valid_attrs = %{
        user_id: user.id,
        reason: "some reason",
        description: "some description",
        content_type: "post",
        content_id: post.id
      }

      assert {:ok, %Report{} = report} = Reports.create_report(valid_attrs)
      assert report.reason == "some reason"
      assert report.description == "some description"
      assert report.content_type == "post"
      assert report.content_id == post.id
    end

    test "create_report/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Reports.create_report(@invalid_attrs)
    end

    test "update_report/2 with valid data updates the report" do
      report = report_fixture()
      update_attrs = %{reason: "some updated reason", description: "some updated description"}

      assert {:ok, %Report{} = report} = Reports.update_report(report, update_attrs)
      assert report.reason == "some updated reason"
      assert report.description == "some updated description"
    end

    test "update_report/2 with invalid data returns error changeset" do
      report = report_fixture()
      assert {:error, %Ecto.Changeset{}} = Reports.update_report(report, @invalid_attrs)
      assert report.id == Reports.get_report!(report.id).id
    end

    test "delete_report/1 deletes the report" do
      report = report_fixture()
      assert {:ok, %Report{}} = Reports.delete_report(report)
      assert_raise Ecto.NoResultsError, fn -> Reports.get_report!(report.id) end
    end

    test "change_report/1 returns a report changeset" do
      report = report_fixture()
      assert %Ecto.Changeset{} = Reports.change_report(report)
    end
  end
end
