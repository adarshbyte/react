import delay from "./delay";



export default async function retry(fn,retries,...args){
    return new Promise((res,rej)=>{
        fn(retries,...args).then(response=>res(response)).catch(e=>{
            if(retries<0){
                rej(e);
            }else{
                return delay(3000).then(()=>retry(fn,retries-1));
            }
        })
    })
}
