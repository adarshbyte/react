import React from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/toastSlice';
import {getUniqueId} from '../../utils/index';

const Home = ()=>{
    const dispatch = useDispatch();
    React.useEffect(()=>{
        let id=setInterval(()=>{
            dispatch(addToast({id:getUniqueId(),msg:'messaeg here'}))
        },1000)  
        return ()=>{
            clearInterval(id)
        }
    },[])
    return <div>test</div>
}
export default Home;