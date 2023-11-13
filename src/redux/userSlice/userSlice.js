import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../localstorage/localStorage";

const initialState = {user : null}
const userSlice = createSlice({
    name : 'user',
    initialState  ,
    reducers : {
        loginRedux : (state, {payload}) =>{

            payload.navigate('/dashboard')
        },
        setUserRedux: (state, {payload})=>{
            console.log('setting user ', payload)
            state.user = {...payload}
        },
        logoutRedux : (state, {payload}) =>{
            state.user = null;
            logoutUser()
            payload.navigate('/login')
        }
    }
})

export const {loginRedux,setUserRedux, logoutRedux} = userSlice.actions;
export default userSlice.reducer