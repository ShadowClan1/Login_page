import { createSlice } from "@reduxjs/toolkit";
const initialState= {open : false, title : '', contentText : '', name : '', yesButtonText : '', noButtonText : '',value : ''}
const smallDBSlice = createSlice({
    name : 'smallDB',
    initialState ,
    reducers : {
        openSmallDB : (state, {payload}) => {
            state.open = true;
            state.title = payload.title;
            state.contentText = payload.contentText;
            state.name = payload.name;
            state.yesButtonText = payload.yesButtonText;
            state.noButtonText = payload.noButtonText;

        },
        closeSmallDB : (state, {payload}) => {
         state.open = false
         state.name = ''
        },
        changeSmallDBValue : (state, {payload}) => {
            state.value = payload.value
        }
    }
})

export const {openSmallDB , closeSmallDB,changeSmallDBValue} = smallDBSlice.actions;
export default smallDBSlice.reducer