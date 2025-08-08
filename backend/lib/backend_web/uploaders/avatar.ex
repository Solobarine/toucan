defmodule Backend.Avatar do
  use Waffle.Definition

  # Include ecto support (requires package waffle_ecto installed):
  use Waffle.Ecto.Definition

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Override the bucket on a per definition basis:
  # def bucket do
  #   :custom_bucket_name
  # end

  # Whitelist file extensions:
  def validate({file, _}) do
    allowed_extensions = ~w(.jpg .jpeg .gif .png .avif .webp)
    max_file_size = 2 * 1024 * 1024
    file_extension = file.file_name |> Path.extname() |> String.downcase()

    cond do
      not Enum.member?(allowed_extensions, file_extension) ->
        {:error, "invalid file type"}

      match?({:error, _}, File.stat(file.path)) ->
        {:error, "could not read file"}

      File.stat!(file.path).size > max_file_size ->
        {:error, "file size must be 2MB or less"}

      true ->
        :ok
    end
  end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  #   {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  # end

  # Override the persisted filenames:
  def filename(_version, {%{file_name: file_name}, _scope}) do
    Path.basename(file_name)
  end

  # Override the storage directory:
  def storage_dir(_version, {_file, scope}) do
    "uploads/avatars/#{scope.id}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  def s3_object_headers(_version, {file, _scope}) do
    [content_type: MIME.from_path(file.file_name), content_disposition: "inline"]
  end
end
