import { Outlet } from "react-router-dom";
import Menu from "../../components/settings/menu";

const Settings = () => {
  return (
    <section className="flex flex-col sm:flex-row min-h-screen overflow-x-hidden">
      <Menu />
      <div className="grow">
        <Outlet />
      </div>
    </section>
  );
};

export default Settings;
