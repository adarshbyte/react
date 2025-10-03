import React from "react";
import data from "./data";

const DropDownPage = () => {
  const [state, setState] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [level, setLevel] = React.useState(0);
  const districtOptions = React.useMemo(() => {
    for (const obj of data) {
      if (obj.name === state) {
        return obj.districts;
      }
    }
    return [];
  }, [state]);
  const stateOptions = React.useMemo(() => {
    return data;
  }, []);
  const citiesOptions = React.useMemo(() => {
    for (const districtObj of districtOptions) {
      if (districtObj.name === district) {
        return districtObj.cities;
      }
    }
    return [];
  }, [district,districtOptions]);
  const options =
    level === 0 ? stateOptions : level === 1 ? districtOptions : citiesOptions;
  const handleClick:React.MouseEventHandler<HTMLUListElement> = (e)=>{
    let newLevel = level===2?level:level+1;
    let target = e.target as HTMLElement;
    if(!target.dataset.name){
        return;
    } 
    if(level===0){
        setState(target.dataset.name??'')
    }else if(level===1){
        setDistrict(target.dataset.name??'');
    }else{
        setCity(target.dataset.name??'');
    }
    setLevel(newLevel)
  }
  const handleBack = ()=>{
    let newLevel = level===0?level:level-1;
    setLevel(newLevel);
  }
  return (
    <div>
      {state},{district},{city}
      <div>
        {level > 0 && <button type="button" onClick={handleBack}>back</button>}
        <ul onClick={handleClick}>
          {
            <>
              {options.map((obj) => {
                return <li key={obj.key} data-name={obj.name} role="button" id={obj.name} tabIndex={0} style={{width:"300px",height:"30px",border:"1px solid gray",marginBottom:"5px",cursor:"pointer"}}>{obj.name}</li>;
              })}
            </>
          }
        </ul>
      </div>
    </div>
  );
};

export default DropDownPage;
