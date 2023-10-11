import { configureStore , createSlice } from '@reduxjs/toolkit'

const authorizationSlice = createSlice({
    name:"Login",
    initialState:{
        isLogin:false, 
    },
    reducers:{
        login(state){
            state.isLogin = true
        },
        logout(state){
            state.isLogin = false
        },
    },
})

export const authAction = authorizationSlice.actions

export const store = configureStore({
    reducer:authorizationSlice.reducer,
})