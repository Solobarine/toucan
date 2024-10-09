import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isMenuOpen: boolean;
  isDarkTheme: boolean;
  isSideBarOpen: boolean;
}

const initialState: InitialState = {
  isMenuOpen: false,
  isDarkTheme: localStorage.getItem("darkTheme") === "dark" ? true : false,
  isSideBarOpen: false,
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setSideBarState: (state, { payload }: { payload: boolean }) => {
      state.isSideBarOpen = payload;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      localStorage.setItem("darkTheme", state.isDarkTheme ? "dark" : "light");
    },
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const { toggleMenu, setSideBarState, toggleTheme, toggleSideBar } =
  settings.actions;
export default settings.reducer;
