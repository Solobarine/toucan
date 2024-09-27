const Splash = () => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="grow grid place-content-center gap-2">
        <img
          src="/android-chrome-512x512.png"
          alt="Toucan Logo"
          loading="lazy"
          className=" w-24 mx-auto"
        />
        <h3 className="text-center text-xl font-semibold">
          Toucan for the Web
        </h3>
        <p>Send and Receive Messages on directly on the Web</p>
      </div>
      <div className="flex items-center justify-center py-10 gap-2">
        <i className="bx bx-lock" />
        <p>End-to-end Encryption</p>
      </div>
    </div>
  );
};

export default Splash;
