import React from 'react';
import delay from '../../utils/delay';

const Debounce = ()=>{
    const [searchText,setSearchText]=React.useState<string>("")
    React.useEffect(()=>{
        let timerId:number;
        (async ()=>{
            try{
               const {id, promise} = await delay(2000)
               timerId=id;
               await promise;
               let res=await fetch('https://randomuser.me/api/');
               res=await res.json();
               console.log(res,"response");
            }catch(e){
            }
        })()
        return ()=>{
            clearTimeout(timerId);
        }
    },[searchText])
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchText(e.target.value)
    }
    return <div>
        <input style={{padding:"10px"}} type='text' value={searchText} onChange={handleChange}/>
        <h4>{searchText}</h4>
    </div>
}
export default Debounce;