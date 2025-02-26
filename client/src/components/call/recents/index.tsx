import { useSelector } from "react-redux";
import Card from "./components/card";
import { RootState } from "../../../features/store";

const Recents = () => {
  const { chats } = useSelector((state: RootState) => state.chats.recents);
  return (
    <div className="flex flex-col basis-72 shrink-0 bg-white/60 dark:bg-stone-700 border-r-2 border-light dark:border-dark min-h-full p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Calls</h2>
        <button>
          <i className="bx bx-phone-call" />
        </button>
      </div>
      <div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Recent Calls"
          className="p-2 h-9 w-full dark:bg-stone-800 rounded-md mt-2"
        />
      </div>
      <div className="recentChats h-full max-h-full mt-6 grid gap-1 overflow-y-scroll">
        {chats.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
};

export default Recents;
