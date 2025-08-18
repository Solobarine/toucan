defmodule Backend.Media do
  use Waffle.Definition

  # Include ecto support (requires package waffle_ecto installed):
  use Waffle.Ecto.Definition

  @versions [:original]

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Override the bucket on a per definition basis:
  # def bucket do
  #   :custom_bucket_name
  # end

  # def bucket({_file, scope}) do
  #   scope.bucket || bucket()
  # end

  # Whitelist file extensions:
  def validate({file, _}) do
    allowed_image_extensions = ~w(.jpg .jpeg .gif .png .avif)
    allowed_video_extensions = ~w(.avi .mov .mp4)
    allowed_document_extensions = ~w(.pdf)

    file_extension = file.file_name |> Path.extname() |> String.downcase()
    size = File.stat!(file.path).size

    cond do
      file_extension in allowed_image_extensions and size <= 2 * 1024 * 1024 -> :ok
      file_extension in allowed_video_extensions and size <= 20 * 1024 * 1024 -> :ok
      file_extension in allowed_document_extensions and size <= 5 * 1024 * 1024 -> :ok
      true -> {:error, :invalid_file}
    end
  end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  #   {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  # end

  # Override the persisted filenames:
  def filename(_version, %{file_name: file_name}, _scope) do
    Path.basename(file_name)
    Ecto.UUID.generate()
  end

  # Override the storage directory:
  def storage_dir(_version, {file, scope}) do
    "uploads/post_media"
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
