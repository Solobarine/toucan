const ChatBox = () => {
  return (
    <div className="messages">
      <div className="bg-white/70 dark:bg-stone-700 p-2 flex items-center justify-between">
        <div className="flex items-start gap-2">
          <img
            src="#"
            alt="Chat Avatar"
            className="w-10 h-10 overflow-hidden rounded-full bg-gray-400"
          />
          <div>
            <p className="font-semibold">Arthur Morgan</p>
            <p className="text-sm mt-0.5">online</p>
          </div>
        </div>
        <div>
          <button className="px-2 py-0.5 rounded-md hover:bg-gray-400/20 hover:dark:bg-gray-100/20">
            <i className="bx bx-video" />
          </button>
          <button className="px-2 py-0.5 rounded-md hover:bg-gray-400/20 hover:dark:bg-gray-100/20">
            <i className="bx bx-phone" />
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll"></div>
      <div className="bg-white/70 dark:bg-stone-700 flex items-center gap-2 py-2 pr-1">
        <button className="hover:bg-gray-100/20 px-2 py-1 rounded-md">
          <i className="bx bx-smile" />
        </button>
        <button className="hover:bg-gray-100/20 px-2 py-1 rounded-md">
          <i className="bx bx-paperclip" />
        </button>
        <input
          type="text"
          name="message"
          placeholder="Type your message"
          className="bg-transparent p-2 outline-none w-full"
        />
      </div>
    </div>
  );
};

export default ChatBox;
