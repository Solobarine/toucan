const CallInfo = () => {
  return (
    <section className="min-h-screen p-4">
      <h2 className="text-xl">Call Info</h2>
      <div className="bg-white dark:bg-stone-700 px-3 py-2 mx-4 my-2 rounded-md">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-3">
            <img
              src="#"
              alt=""
              loading="lazy"
              className="w-10 h-10 rounded-full bg-gray-400 dark:bg-white/20"
            />
            <p className="text-lg">Alan</p>
          </span>
          <span className="flex items-center gap-2">
            <button className="w-9 h-9 grid place-items-center rounded-md hover:bg-white hover:dark:bg-white/20">
              <i className="bx bx-message-square-dots text-xl" />
            </button>
            <button className="w-9 h-9 grid place-items-center rounded-md hover:bg-white hover:dark:bg-white/20">
              <i className="bx bx-video text-xl" />
            </button>
            <button className="w-9 h-9 grid place-items-center rounded-md hover:bg-white hover:dark:bg-white/20">
              <i className="bx bx-phone-call text-xl" />
            </button>
          </span>
        </div>
        <div className="pt-4">
          <p className="opacity-85">Tuesday</p>
          <span className="mt-2 flex items-center justify-between gap-4">
            <p>
              <span>
                <i className="bx bx-phone-off" />
                Missed voice call at 14:56
              </span>
            </p>
            <p>Unanswered</p>
          </span>
        </div>
      </div>
    </section>
  );
};

export default CallInfo;
