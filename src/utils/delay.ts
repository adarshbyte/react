export default async function delay(ms:number){
    let id:number;
    const promise = new Promise<string>((res)=>{
        id=window.setTimeout(() => {
            res("resolved")
        }, ms);
    })
    return {id:id!,promise}
}