import React from "react";

type ProductType = {
  id: number;
  title: string;
};

const AutoComplete = () => {
  const [input, setInput] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const [currentFocus, setFocus] = React.useState(0);
  const [data, setData] = React.useState<ProductType[]>([]);
  const handleClickSuggestion: React.MouseEventHandler<HTMLUListElement> = (
    e
  ) => {
    setInput((e.target as HTMLElement).textContent);
    setData([]);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase().includes("down")) {
      setFocus((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    } else if (e.key.toLowerCase().includes("up")) {
      setFocus((prev) => {
        if (prev === 0) {
          return data.length - 1;
        }
        return prev - 1;
      });
    } else if (e.key.toLowerCase() === "enter") {
      setInput((e.target as HTMLElement).textContent);
      setData([]);
    } else if (e.key.toLowerCase().includes("esc")) {
      setData([]);
    }
  };
  React.useEffect(() => {
    let timerId;
    let controller = new AbortController();
    (async () => {
      await new Promise((res) => {
        setTimeout(() => {
          res("resolved");
        }, 2000);
      });
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${input}`,
        {
          signal: controller.signal,
        }
      );
      const json = await response.json();
      setData(json.products || []);
    })();
    return () => {
      clearTimeout(timerId);
      controller.abort();
      setFocus(0)
    };
  }, [input]);
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <ul onClick={handleClickSuggestion}>
        {data?.map((d, i) => {
          return (
            <li
              key={d.id}
              style={{ background: currentFocus === i ? "lightgray" : "white" }}
              tabIndex={0}
            >
              {d.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default AutoComplete;
