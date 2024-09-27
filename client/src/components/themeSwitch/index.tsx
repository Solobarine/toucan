import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { toggleTheme } from "../../features/slices/settings";

const ThemeSwitch = ({ ...props }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      {...props}
      className="text-2xl px-2 rounded-sm hover:outline shadow-md hover:outline-primary focus:outline-primary"
    >
      {isDarkTheme ? (
        <i className="bx bxs-sun"></i>
      ) : (
        <i className="bx bxs-moon"></i>
      )}
    </button>
  );
};

export default ThemeSwitch;
