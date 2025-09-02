import { Action, ActionTypes, AppState } from "../../types/todos.types";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
type props = {
  appState: AppState;
  setAppState: React.Dispatch<Action>;
};

const ListView = ({ appState, setAppState }: props) => {
  const { tasks, lists, listOrder } = appState;
  const handleDragDrop = (e: any) => {
    console.log(e, "draggable id");
    if (e.destination === null) {
      return;
    }
    let sourceList = e.source.droppableId;
    let sourceIndex = e.source.index;
    let destinationList = e.destination.droppableId;
    let destinationListIndex = e.destination.index;
    let updatedList = { ...appState };
    if (e.type === "LIST") {
      let listIdToMove = e.draggableId;
      console.log(updatedList.listOrder);
      updatedList.listOrder.splice(sourceIndex, 1);
      updatedList.listOrder.splice(destinationListIndex, 0, listIdToMove);
      console.log(updatedList.listOrder);
    } else {
      let taskId = e.draggableId;
      updatedList.lists[sourceList].taskIds.splice(sourceIndex, 1);
      updatedList.lists[destinationList].taskIds.splice(
        destinationListIndex,
        0,
        taskId
      );
    }
    setAppState({ type: ActionTypes.UPDATE_APP_STATE, payload: updatedList });
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="list" type="LIST">
          {(provided: any) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                role="list"
                aria-label="All Lists"
              >
                {listOrder.map((listId, index) => {
                  let taskIds = lists[listId].taskIds;
                  return (
                    <Draggable key={listId} index={index} draggableId={listId}>
                      {(provided: any) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            role="listitem"
                            aria-label={`List: ${lists[listId].name}`}
                            style={{
                              ...provided.draggableProps.style,
                              border: "2px solid",
                              margin: "5px",
                              background: "lightblue",
                              padding: "8px",
                              minHeight: "100px",
                            }}
                          >
                            <div {...provided.dragHandleProps}>
                              {lists[listId].name}
                            </div>
                            <Droppable droppableId={listId} type="TASK">
                              {(provided: any) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    role="list"
                                    aria-label={`List : ${lists[listId].name}`}
                                    style={{
                                      padding: "8px",
                                      overflowY: "auto",
                                      maxHeight: "200px",
                                    }}
                                  >
                                    {taskIds.map((taskId, index) => {
                                      let task = tasks[taskId];
                                      return (
                                        <Draggable
                                          key={taskId}
                                          draggableId={taskId}
                                          index={index}
                                        >
                                          {(provided: any) => (
                                            <div
                                              role="listitem"
                                              aria-label={`Task: ${tasks[taskId].title}`}
                                              ref={provided.innerRef}
                                              tabIndex={0}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                ...provided.draggableProps
                                                  .style,
                                                border: "1px solid grey",
                                                padding: "8px",
                                                marginBottom: "8px",
                                                background: "white",
                                              }}
                                            >
                                              {task.title}
                                            </div>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                    {provided.placeholder}
                                  </div>
                                );
                              }}
                            </Droppable>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default ListView;
