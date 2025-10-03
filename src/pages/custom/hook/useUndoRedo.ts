import React from "react";

function useUndoRedo(history: number) {
  let initialData = Array.from({ length: history }, () => "");
  const [data, setData] = React.useState<string[]>(initialData);
  const [pointer, setPointer] = React.useState(-1);
  const undo = () => {
    setPointer((prev) => {
      return prev === 0 ? 0 : prev - 1;
    });
  };
  const redo = () => {
    setPointer((prev) => {
      return prev === data.length - 1 ? prev : prev + 1;
    });
  };
  const setState = (newState: string) => {
    let newPointer = (pointer + 1) % history;
    setData((prev) => {
      prev[newPointer % history] = newState;
      return prev;
    });
    setPointer(newPointer);
  };
  return { undo, redo, state: data[pointer%history], setState };
}
export default useUndoRedo;
