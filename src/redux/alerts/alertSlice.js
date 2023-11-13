import { createSlice } from "@reduxjs/toolkit";

const initialState = {visible : false, message : '' , type : ''}

const alertSlice = createSlice({
    name : 'Alert',
initialState , 
reducers : {
    showAlert : (state, {payload})=>{
        
    state.visible = true ;
     state.message = payload.message ;
      state.type = payload.type;

   
      
    },
    closeAlert: (state, action)=>{
        state.visible = false;
        // state.message = '';
        // state.type = ''
    }
    }
})

export const {showAlert, closeAlert} = alertSlice.actions;
export default alertSlice.reducer;