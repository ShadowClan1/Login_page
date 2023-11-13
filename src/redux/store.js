import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alerts/alertSlice";
import smallDialogBox from "./DialogBoxes/smallDialogBox";
import fileSlice from "./file_manager/fileSlice";
import userSlice from "./userSlice/userSlice";

const store = configureStore({
reducer : {
    alert : alertSlice,
    smallDB : smallDialogBox,
    fileManager : fileSlice,
    user : userSlice
}
})

export default store;