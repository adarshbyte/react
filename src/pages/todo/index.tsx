import React from 'react';
import {AppState, Action, ActionTypes} from '../../types/todos.types';
import initialState from './temp';
import Form from './Form';
import List from './ListView';

const reducer = (state:AppState,action:Action):AppState=>{
    switch (action.type) {
        case ActionTypes.ADD_TASK:{
            return {...state,tasks:{...state.tasks,[action.payload.id]:action.payload}}
        }
        case ActionTypes.DELETE_TASK:{
            let updatedTasks = {...state.tasks};
            delete updatedTasks.tasks[action.payload];
            return {...state,tasks: updatedTasks};
        }
        default :
            return state;
    }
}
const Todo = ()=>{
    const [appState,setAppState]=React.useReducer(reducer,initialState);

    return <div>
        <Form setAppState={setAppState}/>
        <List appState={appState} setAppState={setAppState}/>
    </div>
}
export default Todo;