// import useInfiniteScroll from "./useInfiniteScroll";
// import { fetchNetworkDelay } from "./utils";
import { createRows } from "./utils";
import React from 'react';
const Dashboard = () => {
    const [data,setData]=React.useState(createRows(100000))
    // const {data,ref}=useInfiniteScroll({fn:fetchNetworkDelay})
    return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((row:any,i)=>{
            return <li key={row.id}>
                {i}
                {row.text}
            </li>
        })}
      </ul>
      {/* <div ref={ref}/> */}
    </div>
  );
};

export default Dashboard;
