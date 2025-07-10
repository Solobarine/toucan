import { Outlet } from "react-router-dom";
import Menu from "../../components/settings/menu";

const Settings = () => {
  return (
    <section className="settings min-h-screen overflow-x-hidden">
      <Menu />
      <Outlet />
    </section>
  );
};

export default Settings;
