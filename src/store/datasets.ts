import { createSlice } from "@reduxjs/toolkit";
import exampleDataSetList from "./temp";
export enum Category {
  TuvaJr = 'Tuva Jr.',
  Math = 'Math',
  Science = 'Science',
}
type Case = {
    attribute:string,
    value:string
}
type Data = {
    data:Case[],
    category:Category,
    name?:string
}
type DataSet = {
    list: Data[],
    currentDataSet?:Data
}

const initialState:DataSet = {
    list:exampleDataSetList as Data[],
    currentDataSet:undefined
}
const dataSetSlice = createSlice({
    name:'datasets',
    initialState,
    reducers:{
        setDataSets:(state,action)=>{
            state.list.push(action.payload)
        },
        setCurrentDataSet:(state,action)=>{
            state.currentDataSet=action.payload;
        }
    }
})

export const {setDataSets} = dataSetSlice.actions;
export default dataSetSlice.reducer;
export type {DataSet,Data};