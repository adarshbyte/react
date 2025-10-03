import React from "react";

type Item = {
  id: string;
  text: string;
};
type VirtualizedListType = {
  items?: Item[];
  containerHeight: number;
  itemHeight: number;
};

const itemsList = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  text: `Item ${index + 1}`,
}));

const InfiniteScroll = (props: VirtualizedListType) => {
  const { items = itemsList, containerHeight, itemHeight } = props;
  const [list, setList] = React.useState<Item[]>([]);
  const loaderRef = React.useRef<HTMLLIElement | null>(null);
  const itemsInAView = Math.floor(containerHeight / itemHeight) - 1;
  React.useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setList((prev) => {
          let start = prev.length === 0 ? 0 : prev.length - 1;
          let newList = items.slice(start, start + itemsInAView) as Item[];
          return [...prev, ...newList];
        });
      }
    });
    observer.observe(loaderRef.current!);
    return () => {
      observer.disconnect();
    };
  },[]);
  return (
    <ul style={{ height: containerHeight + "px" }}>
      {list?.map((item) => {
        return (
          <li style={{ height: itemHeight + "px" }} key={item.id}>
            {item.text}
          </li>
        );
      })}
      <li ref={loaderRef} style={{ height: "50px" }}>
        Loading...
      </li>
    </ul>
  );
};

export default InfiniteScroll;
