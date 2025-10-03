import React from "react";

const data = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  text: `Item ${index + 1}`,
}));

type Item = {
  id: number;
  text: string;
};
type PropType = {
  items?: Item[];
  containerHeight: number;
  itemHeight: number;
};

const VirtualizedList = (props: PropType) => {
  const { items = data, containerHeight, itemHeight } = props;
  let totalItems = Math.floor(containerHeight / itemHeight) + 1;
  const [list, setList] = React.useState<Item[]>(items.slice(0, totalItems));
  const scrollRef = React.useRef(null);
  const [currentPos,setCurrentPos] = React.useState(0)
  React.useEffect(() => {
    let handleScrollEvent = (e: Event) => {
      let pos = (e.currentTarget as Element).scrollTop;
      setCurrentPos(Math.floor(pos));
      console.log(pos,"position")
      let start = Math.floor(pos / itemHeight);
      let totalItems = Math.floor(containerHeight / itemHeight) + 1;
      console.log(start, totalItems, "start total items");
      setList(items.slice(start, start + totalItems));
    };
    if (scrollRef.current) {
      (scrollRef.current as HTMLElement).addEventListener(
        "scroll",
        handleScrollEvent
      );
    }
    return () => {
      if (scrollRef.current) {
        (scrollRef.current as HTMLElement).removeEventListener(
          "scroll",
          handleScrollEvent
        );
      }
    };
  }, []);
  {
    console.log(list, "list",currentPos);
  }
  return (
    <div
      ref={scrollRef}
      style={{
        height: `${containerHeight}px`,
        border: "2px solid",
        overflow: "auto",
        position:"relative"
      }}
    >
    
      <ul style={{ height: `${itemHeight * items.length}px`,top:`${currentPos}px`,position:"absolute" }}>
        {list?.map((item) => {
          return (
            <li key={item.id} style={{ height: `${itemHeight}px` }}>
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default VirtualizedList;
