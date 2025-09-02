import React from 'react';
import { Action, ActionTypes, Task } from '../../types/todos.types';

type props = {
    setAppState: React.Dispatch<Action>
}
const Form = ({setAppState}:props)=>{
    const initialState:Task = {
        id:"",
        title:"",
        notes:"",
        createdAt:"",
        updatedAt:"",
        completed:false,
        priority:"low"
    }
    const [error,setError]=React.useState('');
    const [formState,setFormState]=React.useState<Task>(initialState)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        console.log(e.target.value,"e.target.value");
        setFormState(prev=>{
            return {...prev,[e.target.id]:e.target.value}
        })
    }
    const handleSubmit = ()=>{
        if(!formState.title){
            setError('please fill required entries')
        }
        setAppState({type:ActionTypes.ADD_TASK,payload:formState});
    }
    return <div>
        <input type='text' id="title" value={formState.title} onChange={handleChange}/>
        <input type="notes" id="notes" value={formState.notes} onChange={handleChange}/>
        <select onChange={handleChange} id="priority" value={formState.priority}>
            <option value="low">Low</option>
            <option value="med">Medium</option>
            <option value="high">High</option>
        </select>
        <button onClick={handleSubmit} type="button">Create tasks</button>
    </div>
}
export default Form;