const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`grid gap-3 place-content-center min-h-[100vh] bg-green-400 ${className}`}
    >
      <div className="flex items-center justify-center">
        <i className="bx bx-loader-circle bx-spin text-7xl" />
      </div>
      <p className="font-semibold opacity-80">
        Loading... Please wait a moment
      </p>
    </div>
  );
};

export default Loading;
