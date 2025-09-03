export default async function delay(ms:number){
    return new Promise((res)=>{
        setTimeout(() => {
            res("resolved")
        }, ms);
    })
}