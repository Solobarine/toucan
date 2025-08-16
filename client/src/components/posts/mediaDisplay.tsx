import { ChevronLeft, ChevronRight, FileText, Play } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

const getMediaTypeFromUrl = (url: string): "image" | "video" | "document" => {
  const extension =
    url.split(".").pop()?.toLowerCase().split("?").shift() || "";

  // Image extensions
  if (
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tiff"].includes(
      extension,
    )
  ) {
    return "image";
  }

  // Video extensions
  if (
    ["mp4", "webm", "ogg", "avi", "mov", "wmv", "flv", "m4v", "mkv"].includes(
      extension,
    )
  ) {
    return "video";
  }

  // Document extensions
  if (
    [
      "pdf",
      "doc",
      "docx",
      "txt",
      "rtf",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "csv",
    ].includes(extension)
  ) {
    return "document";
  }

  // Default to image for unknown extensions
  return "image";
};

const MediaDisplay = ({ media }: { media: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const back = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") back();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [back, next]);

  const renderMediaItem = (item: string, index: number) => {
    const isActive = index === activeIndex;
    const mediaType = getMediaTypeFromUrl(item);

    switch (mediaType) {
      case "image":
        return (
          <img
            key={`${mediaType}-${index}`}
            src={item || "/placeholder.svg"}
            alt={`Image ${index + 1} of ${media.length}`}
            className="w-full h-auto object-cover flex-shrink-0"
            loading={index === 0 ? "eager" : "lazy"}
          />
        );

      case "video":
        return (
          <div
            key={`${mediaType}-${index}`}
            className="relative w-full flex-shrink-0"
          >
            <video
              src={item}
              controls={isActive}
              className="w-full h-auto object-cover"
              preload={index === 0 ? "metadata" : "none"}
            >
              Your browser does not support the video tag.
            </video>
            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="p-4 rounded-full bg-black/50 text-white">
                  <Play size={32} />
                </div>
              </div>
            )}
          </div>
        );

      case "document":
        return (
          <div
            key={`${mediaType}-${index}`}
            className="w-full flex-shrink-0 bg-white"
          >
            {renderDocument(item, isActive)}
          </div>
        );

      default:
        return null;
    }
  };

  const renderDocument = (item: string, isActive: boolean) => {
    const extension =
      item.split(".").pop()?.toLowerCase().split("?").shift() || "";

    // PDF files - render directly with iframe
    if (extension === "pdf") {
      return (
        <div className="relative w-full h-[600px]">
          <iframe
            src={`${item}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-0"
            title={"PDF Document"}
            loading={isActive ? "eager" : "lazy"}
          />
          <div className="absolute top-4 left-4">
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-black/70 text-white text-sm rounded hover:bg-black/80 transition-colors"
            >
              Open Full
            </a>
          </div>
        </div>
      );
    }

    // Office documents - use Microsoft Office Online viewer
    if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(extension)) {
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item)}`;
      return (
        <div className="relative w-full h-[600px]">
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={"Office Document"}
            loading={isActive ? "eager" : "lazy"}
          />
          <div className="absolute top-4 right-4">
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      );
    }

    // Text files - could fetch and display content (simplified version)
    if (["txt", "rtf", "csv"].includes(extension)) {
      return (
        <div className="w-full h-[600px] bg-gray-50 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-gray-600" />
                <span className="font-medium text-gray-900">
                  {"Text Document"}
                </span>
              </div>
              <a
                href={item}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                View Full
              </a>
            </div>
            <div className="text-gray-700 text-sm">
              <p>
                Text file preview - click "View Full" to see complete content
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Fallback for unsupported document types
    return (
      <div className="w-full h-[600px] bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 p-6 rounded-full bg-blue-100">
            <FileText size={48} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {"Document"}
          </h3>
          <p className="text-gray-600 mb-4">
            Preview not available for this file type
          </p>
          <a
            href={item}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText size={16} className="mr-2" />
            Open Document
          </a>
        </div>
      </div>
    );
  };

  const getMediaTypeLabel = (item: string, index: number) => {
    if (!item) return `Media ${index + 1} of ${media.length}`;
    const mediaType = getMediaTypeFromUrl(item);
    const typeLabel = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
    return `${typeLabel} ${index + 1} of ${media.length}`;
  };

  // Don't render if no media
  if (!media.length) return null;

  const currentItem = media[activeIndex];
  if (!currentItem) return null;
  const currentMediaType = getMediaTypeFromUrl(currentItem);

  // Single media item - no navigation needed
  if (media.length === 1) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-gray-100">
        {renderMediaItem(currentItem, 0)}
      </div>
    );
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-gray-100 group"
      role="region"
      aria-label="Media carousel"
      tabIndex={0}
    >
      <div className="relative w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {media.map((item, index) => renderMediaItem(item, index))}
        </div>
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={back}
        aria-label={`Previous ${currentMediaType}`} // Use detected media type
        disabled={media.length <= 1}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={next}
        aria-label={`Next ${currentMediaType}`} // Use detected media type
        disabled={media.length <= 1}
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {media.map((item, index) => {
          const itemType = getMediaTypeFromUrl(item);
          return (
            <button
              key={index}
              className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                index === activeIndex
                  ? "bg-white scale-110 shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${getMediaTypeLabel(item, index)}`}
            >
              {itemType === "video" && (
                <Play
                  size={12}
                  className={
                    index === activeIndex ? "text-gray-800" : "text-white"
                  }
                />
              )}
              {itemType === "document" && (
                <FileText
                  size={12}
                  className={
                    index === activeIndex ? "text-gray-800" : "text-white"
                  }
                />
              )}
              {itemType === "image" && (
                <div
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-gray-800" : "bg-white"}`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
        <span className="capitalize">{currentMediaType}</span> {activeIndex + 1}{" "}
        / {media.length}
      </div>
    </div>
  );
};

export default MediaDisplay;
