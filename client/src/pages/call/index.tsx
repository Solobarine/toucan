import { Outlet } from "react-router-dom";
import Recents from "../../components/call/recents";

const Call = () => {
  return (
    <section className="flex h-screen">
      <Recents />
      <div className="grow">
        <Outlet />
      </div>
    </section>
  );
};

export default Call;
