import React from "react";

type props<T> = {
    fn:(args:any)=>Promise<any>,
    initialState?: T[]
}
type ReturnType<T> = {
    data:T[],
    loadMore:()=>Promise<void>;
    ref: React.RefObject<HTMLDivElement | null>
}
const useInfiniteScroll =<T>({fn,initialState}:props<T>):ReturnType<T>=>{
    const [data,setData]=React.useState(initialState || []);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const loadMore = React.useCallback(async ()=>{
        try{
            let res=await fn({noOfRows:10});
            setData(prev=>{
                return [...prev,...res]
            });
        }catch(e){
            console.log('no data found');
        }
    },[fn])
    // fn will update just as when page number updates or page size
    React.useEffect(()=>{
        let observer= new IntersectionObserver((e)=>{
            if(e[0].isIntersecting){
                console.log("is intersecting")
                loadMore()
            }else{
                console.log("not intersecting")
            }
        })
        if(ref.current){
            observer.observe(ref.current!)
        }
        return ()=>{
            observer.unobserve(ref.current!)
        }
    },[ref.current])
    
    return {loadMore,ref,data};
}
export default useInfiniteScroll;