import { useEffect } from "react";
import Header from "./components/header";
import { useSelector } from "react-redux";
import { RootState } from "./features/store";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);
  // Set Theme
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);
  return (
    <main className="app font-itim bg-white dark:bg-dark text-gray-800 dark:text-gray-100">
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default App;
