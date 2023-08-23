import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
    name : 'result',
    initialState:{
        userID:null,
        result:[]
    },
    reducers : {
        setUserID : (state,action) => {
            state.userID = action.payload
        },
        pushResultAction : (state,action) =>{
            state.result.push(action.payload)
        },
        updateResultAction : (state,action) =>{
            const {trace, checked} = action.payload;
            state.result.fill(checked,trace,trace+1)
        },
        resetResultAction : () =>{
            return {
                userID : null,
                result : []
            }
        }
    }
})

export const {setUserID,resetResultAction,updateResultAction,pushResultAction} = resultReducer.actions;

export default resultReducer.reducer;