import images from './temp/images.json';

const SlowImageLoader = ()=>{
    return <div>
        {images.map(image=>{
            return <li key={image.id}>
                <p>{image.id} {image.title}</p>
                <img width={"400px"} height={"400px"} src={image.url}/>
            </li>
        })}
    </div>
}
export default SlowImageLoader;