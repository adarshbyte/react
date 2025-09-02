type ID = string;

export type Task = {
  id: ID;
  title: string;          // required, 1..140 chars
  notes?: string;         // optional, up to ~2k
  dueAt?: string;         // ISO date
  createdAt: string;      // ISO
  updatedAt: string;      // ISO
  completed: boolean;
  priority?: "low" | "med" | "high";
};

export type List = {
  id: ID;
  name: string;           // unique per app
  taskIds: ID[];          // defines order
};

export type AppState = {
  lists: Record<ID, List>;
  tasks: Record<ID, Task>;
  listOrder: ID[];        // lists’ order (optional)
  version: number;        // for migrations
};

export const ActionTypes = {
    ADD_TASK : "ADD_TASK",
    DELETE_TASK : "DELETE_TASK",
    UPDATE_APP_STATE: "UPDATE_APP_STATE"
} as const
export type Action = {
    type : typeof ActionTypes.ADD_TASK,
    payload: Task
} | {
    type: typeof ActionTypes.DELETE_TASK,
    payload: string
} | {
    type: typeof ActionTypes.UPDATE_APP_STATE,
    payload: AppState
}
export type Reducer={
    state:AppState,
    action:Action
}