import { createSlice } from "@reduxjs/toolkit";
const initialState= {open : false, title : '', contentText : '', name : '', yesButtonText : '', noButtonText : '',value : '', textFieldValue : '', metaData : {}}
const smallDBSlice = createSlice({
    name : 'smallDB',
    initialState ,
    reducers : {
        openSmallDB : (state, {payload}) => {
            console.log(payload, "here we have payload ")
            state.open = true;
            state.title = payload.title;
            state.contentText = payload.contentText;
            state.name = payload.name;
            state.yesButtonText = payload.yesButtonText;
            state.noButtonText = payload.noButtonText;
            if(payload.title === "Rename File") {
                state.textFieldValue = payload.textFieldValue;
                state.metaData.file = payload.file 
                state.metaData.type = payload.type 
                 
            }


        },
        closeSmallDB : (state, {payload}) => {
         state.open = false
         state.name = ''
         state.textFieldValue = ''
        },
        changeSmallDBValue : (state, {payload}) => {
            state.value = payload.value
        }
    }
})

export const {openSmallDB , closeSmallDB,changeSmallDBValue} = smallDBSlice.actions;
export default smallDBSlice.reducer