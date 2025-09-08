import { createSlice } from "@reduxjs/toolkit";

const ToastsSlice = createSlice({
    name:'toasts',
    initialState:[],
    reducers:{
        addToast:(state,action)=>{
            console.log("inside here action add toast")
            state.push(action.payload)
        },
        removeToast:(state,action)=>{
            console.log("inside of remove ",action)
            state=state.filter(t=>t.id!==action.payload)
            return state;
        }
    }
})
export const {addToast,removeToast} = ToastsSlice.actions
export default ToastsSlice.reducer;