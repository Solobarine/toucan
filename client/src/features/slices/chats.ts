import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/auth";
import { Chat } from "../../types/chat";
import { getUser } from "../thunks/user";
import { createChat, deleteChat, updateChat } from "../thunks/chats";

interface InitialState {
  recents: {
    chats: [] | Chat[];
  };
  privateChat: {
    status: "idle" | "pending" | "failed";
    user: Pick<User, "id" | "avatar" | "first_name" | "last_name" | "username">;
    chats: [] | Chat[];
    error: string | null;
  };
  create: {
    status: "idle" | "pending" | "failed";
    error: string | null;
  };
  update: {
    status: "idle" | "pending" | "failed";
    error: string | null;
  };
  delete: {
    status: "idle" | "pending" | "failed";
    error: string | null;
  };
}

const initialState: InitialState = {
  recents: {
    chats: [],
  },
  privateChat: {
    status: "idle",
    user: { id: 0, avatar: "", first_name: "", last_name: "", username: "" },
    chats: [],
    error: null,
  },
  create: {
    status: "idle",
    error: null,
  },
  update: {
    status: "idle",
    error: null,
  },
  delete: {
    status: "idle",
    error: null,
  },
};

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    populateRecents: (state, action) => {
      state.recents = {
        ...state.recents,
        chats: action.payload,
      };
    },
    appendRecents: (state, action) => {
      state.recents = {
        ...state.recents,
        chats: [
          action.payload,
          ...state.recents.chats.filter(
            (chat) => chat.name !== action.payload.name
          ),
        ],
      };
    },
    populatePrivateChat: (state, action) => {
      state.privateChat.chats = action.payload;
    },
    appendPrivateChat: (state, action) => {
      state.privateChat.chats = [...state.privateChat.chats, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.privateChat = {
        ...state.privateChat,
        status: "pending",
        error: null,
        user: initialState.privateChat.user,
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.privateChat = {
        ...state.privateChat,
        status: "idle",
        user: action.payload.data.user,
      };
    });
    builder.addCase(getUser.rejected, (state) => {
      state.privateChat = {
        ...state.privateChat,
        status: "failed",
        error: "Something went wrong",
      };
    });

    /** CREATE CHAT **/
    builder.addCase(createChat.pending, (state) => {
      state.create = { ...state.create, status: "pending", error: null };
    });
    builder.addCase(createChat.fulfilled, (state) => {
      state.create = { ...state.create, status: "idle" };
    });
    builder.addCase(createChat.rejected, (state) => {
      state.create = {
        ...state.create,
        status: "failed",
        error: "Something went wrong",
      };
    });

    /** UPDATE CHAT **/
    builder.addCase(updateChat.pending, (state) => {
      state.update = { ...state.update, status: "pending", error: null };
    });
    builder.addCase(updateChat.fulfilled, (state) => {
      state.update = { ...state.update, status: "idle" };
    });
    builder.addCase(updateChat.rejected, (state) => {
      state.update = {
        ...state.update,
        status: "failed",
        error: "Something went wrong",
      };
    });

    /** DELETE CHAT **/
    builder.addCase(deleteChat.pending, (state) => {
      state.delete = { ...state.delete, status: "pending", error: null };
    });
    builder.addCase(deleteChat.fulfilled, (state) => {
      state.delete = { ...state.delete, status: "idle" };
    });
    builder.addCase(deleteChat.rejected, (state) => {
      state.delete = {
        ...state.delete,
        status: "failed",
        error: "Something went wrong",
      };
    });
  },
});

export const {
  populateRecents,
  appendRecents,
  populatePrivateChat,
  appendPrivateChat,
} = chats.actions;
export default chats.reducer;
