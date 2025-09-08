import React from 'react';
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeToast } from '../../store/toastSlice';

const Toast = (props)=>{
    const dispatch = useDispatch();
    const { msg , id } =props;
    React.useEffect(()=>{
        let timer = setTimeout(()=>{
            dispatch(removeToast(id));
        },2000)
        return ()=>{
            clearTimeout(timer);
        }
    },[])
    return <li key={id} style={{border:"1px solid gray",background:"lightblue",margin:"2px",borderRadius:"10px"}}>
        <button onClick={()=>{
            dispatch(removeToast(id));
        }}>Close icon</button>
        <p>{msg} {id}</p>
    </li>
}
const Toasts = ()=>{
    const toasts = useSelector(state=>state.toasts);
    
    return ReactDOM.createPortal(<ul style={{...toastContainer,display:toasts.length>0?'':'hidden',overflow:"auto"}}>
        {toasts?.map(toast=>{
            return <Toast msg={toast.msg} id={toast.id}/>
        })}
    </ul>,document.body)
}
export default Toasts;

const toastContainer:React.CSSProperties = {
    border:"2px solid",
    width:"50vw",
    height:"100vh",
    top:"0px",
    right:"0px",
    position:"absolute",
}