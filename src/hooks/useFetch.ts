import React from 'react';
import { fakeProducts } from './products';
import { CartType } from '../types/products.types';

const useFetch =<T>(url:string,cartItems?:CartType)=>{
    const [data,setData] = React.useState<T | null>(null);
    const [loading,setLoading] = React.useState<boolean>(false)
    const [error,setError] = React.useState<string>('');
    
    React.useEffect(()=>{
        (async ()=>{
            try{
                setLoading(true);
                let products = await new Promise<T>((res)=>{
                    setTimeout(()=>{
                        if(cartItems){
                            let cartIds = Object.keys(cartItems);
                            let items = fakeProducts.filter(product=>{
                                console.log(cartIds,cartIds.includes(product.id),product.id)
                                return cartIds.indexOf(product.id)!=-1;
                            })
                            return res(items as T);
                        }
                        res(fakeProducts as T)
                    },1000)
                })
                setData(products);
                setLoading(false)
            }catch(e){
                setLoading(false);
                setError('errored')
            }
        })()
    },[url,cartItems])
    return { data,loading,error }
}
export default useFetch;