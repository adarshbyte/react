import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';

const ToastPortal = ({children})=>{
  return ReactDOM.createPortal(children,document.body);
}
const ToastMessage = ({toastMessages,setToastMessages,count})=>{
  React.useEffect(()=>{
    if(toastMessages.length===0){
      return
    }
    setTimeout(() => {
      console.log("inside of callback")
      setToastMessages(prev=>{
        let tmp=[...prev];
        tmp.shift();
        return tmp;
      })
    }, 5000);
  },[count])
  return <ul style={{position:"fixed",top:"10px",right:"10px"}}>
    {toastMessages.map((toast)=>{
      return <li key={toast.id} style={{listStyle:"none",position:"relative"}}>
          <p>{toast.msg}</p>
        </li>
    })}
  </ul>
}

function Portal() {
  const [toastMessages,setToastMessages]=React.useState([]);
  const [count,setCount]=React.useState(0)
  return (
    <div className=''>
      <h2>top level</h2>
      <button type='button' onClick={()=>{setToastMessages(prev=>{
        setCount(prev=>prev+1);
        return [...prev,{id:Math.random()*100,msg:(Math.random()*100).toFixed(2)}]
      })}}>Create a toast</button>
      {toastMessages.length>0 && <ToastPortal>
          <ToastMessage toastMessages={toastMessages} count={count} setToastMessages={setToastMessages}/>
        </ToastPortal>}
    </div>
  )
}

export default Portal
