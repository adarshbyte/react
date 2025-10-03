import React from 'react';

type Debounce = {
    fn:(...args:any)=>void,
    delay:number
}

const useDebounce = ({fn,delay}:Debounce)=>{
    let timerRef=React.useRef<number|undefined>(undefined)
    return (...args:any[])=>{
        clearTimeout(timerRef.current);
        timerRef.current=setTimeout(()=>{
            fn(...args);
        },delay || 1000)
    }
}
export default useDebounce;