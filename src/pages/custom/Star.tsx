import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";

type StarType = {
  readOnly?: boolean;
  max?: number;
  value: number;
};

const Star = (props: StarType) => {
  const { value, readOnly, max = 5 } = props;
  const [Value,setValue] = React.useState(value);
  const [coloredStars,setColoredStars] = React.useState<number>(value);
  const [stars, setStars] = React.useState(Array.from({ length: max }).fill(1));
  const handleClick = (_,index:any)=>{
    setValue(index+1);
    setColoredStars(index+1)
  }
  const handleMouseOver = (e:React.MouseEvent<HTMLLIElement>,index:number)=>{
    setColoredStars(index+1)
  }
  const handleMouseOut = ()=>{
    setColoredStars(Value);
  }
  return (
    <div>
      <ul style={{display:'flex'}}>
        {stars.map((star,index) => {
          return (
            <li key={index} style={{cursor:"pointer"}} onMouseOut={handleMouseOut} onMouseOver={(e)=>handleMouseOver(e,index)} onClick={(e)=>handleClick(e,index)} role="button">
              <StarBorderIcon style={{backgroundColor:index<coloredStars?"yellow":''}}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Star;
