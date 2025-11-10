import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";


const initialState={
    isAuthenticated:false,
    userEmail:null,
    userRole:null,
    userTokens:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.isAuthenticated=true;
            state.userTokens=action.payload;
            localStorage.setItem("authTokens",JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            localStorage.removeItem("authTokens");
        },
        setUser:(state,action)=>{
            const decoded=jwtDecode(action.payload);
            console.log("Decoded JWT:", decoded);
            state.userEmail=decoded.sub;
            state.userRole=decoded.roles;
        },
        clearUser:(state)=>{
            state.userEmail=null;
            state.userRole=null;
        }
        
    }
})

export const {loginSuccess,logout,setUser,clearUser}=authSlice.actions;
export default authSlice.reducer;