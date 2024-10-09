import { Outlet } from "react-router-dom";
import Recents from "../../components/chat/recents";

const Chat = () => {
  return (
    <section className="flex h-screen">
      <Recents />
      <div className="grow">
        <Outlet />
      </div>
    </section>
  );
};

export default Chat;
