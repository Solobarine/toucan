import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isMenuOpen: boolean;
  isDarkTheme: boolean;
  isSideBarOpen: boolean;
  isChatSidebarOpen: boolean;
  isPostModalOpen: boolean;
}

const initialState: InitialState = {
  isMenuOpen: false,
  isDarkTheme: localStorage.getItem("darkTheme") === "dark" ? true : false,
  isSideBarOpen: false,
  isChatSidebarOpen: false,
  isPostModalOpen: false,
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
    toggleChatSidebar: (state, { payload }: { payload: boolean }) => {
      state.isChatSidebarOpen = payload;
    },
    togglePostModal: (state, { payload }: { payload: boolean }) => {
      state.isPostModalOpen = payload;
    },
  },
});

export const {
  toggleMenu,
  setSideBarState,
  toggleTheme,
  toggleSideBar,
  toggleChatSidebar,
  togglePostModal,
} = settings.actions;
export default settings.reducer;
