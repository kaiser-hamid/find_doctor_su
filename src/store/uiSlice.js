import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    pagePopup: {
      status: false,
      type: null,
      title: null,
      text: null,
    },
  },
  reducers: {
    openPopup(state, data) {
      state.pagePopup.status = true;
      state.pagePopup.type = data.payload.type;
      state.pagePopup.title = data.payload.title;
      state.pagePopup.text = data.payload.text;
    },
    closePopup(state) {
      state.pagePopup = {
        status: false,
        type: null,
        title: null,
        text: null,
      };
    },
  },
});

export const { openPopup: openPopupAction, closePopup: closePopupAction } =
  uiSlice.actions;

export default uiSlice.reducer;
