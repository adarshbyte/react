import React from "react";
import Accordion from './Accordion';
import AutoComplete from "./AutoComplete";
import Star from "./Star";
import VirtualizedList from "./VirtualisedList";
// import InfiniteScroll from "./InfiniteScroll";

const CustomPage = () => {


  return <div>
    {/* <Accordion allowMultiple={true} style={{width:"300px"}}/> */}
    {/* <Star max={5} readOnly={false} value={3}/> */}
    {/* <AutoComplete/> */}
    {/* <InfiniteScroll itemHeight={50} containerHeight={300}/> */}
    <VirtualizedList itemHeight={50} containerHeight={300}/>
  </div>;
};

export default CustomPage;
