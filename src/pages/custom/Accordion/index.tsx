import React from "react";
import data from "./data";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export type ItemType = {
  title: string;
  content: ItemType[] | string;
};

type AccordionType = {
  items?: ItemType[];
  allowMultiple: boolean;
  style?: Record<string, string | number>;
  level?: number;
};

const Accordion = (props: AccordionType) => {
  const { items = data, allowMultiple, style, level = 0 } = props;
  const [openedItems, setOpenedItems] = React.useState<Record<string, boolean>>(
    {}
  );
  const handleOpen = (id: string) => {
    setOpenedItems((prev) => {
      if(!allowMultiple){
        let entries = Object.entries(prev);
        return Object.fromEntries(entries.map(entry=>{
            if(entry[0]===id){
                return [entry[0],!entry[1]]
            }
            return [entry[0],false];
        }))
      }
      return { ...prev, [id]: !prev[id] };
    });
  };
  return (
    <ul style={{ ...style }}>
      {items.map((item) => {
        return (
          <li>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>{item.title}</p>
              {openedItems[item.title + level] && (
                <KeyboardArrowDownIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpen(item.title + level)}
                  tabIndex={level}
                  onKeyDown={() => handleOpen(item.title + level)}
                />
              )}
              {!openedItems[item.title + level] && (
                <KeyboardArrowRightIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpen(item.title + level)}
                  tabIndex={level}
                  onKeyDown={() => handleOpen(item.title + level)}
                />
              )}
            </div>
            <div>
              {openedItems[item.title + level] &&
                Array.isArray(item.content) && (
                  <Accordion
                    items={item.content}
                    allowMultiple={allowMultiple}
                    level={level + 1}
                  />
                )}
              {openedItems[item.title+level] && !Array.isArray(item.content) && <p>{item.content}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Accordion;
