import React, { createContext, useReducer } from "react";

export enum Types {
  ADD_TASK = "ADD_TASK",
  DELETE_TASK = "DELETE_TASK",
  EDIT_TASK = "EDIT_TASK",
}

interface Task {
  id: number;
  todo: string;
  isDone: boolean;
}

export type TaskState = {
  tasks: Task[];
};

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: number }
  | { type: "DELETE_TASK"; payload: number };

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<Action>;
}>({
  state: { tasks: [] },
  dispatch: () => {},
});

function taskReducer(state: TaskState, action: Action): TaskState {
  switch (action.type) {
    case Types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case Types.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id !== action.payload ? { ...task, isDone: !task.isDone } : task
        ),
      };
    case Types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export { TaskContext,TaskProvider };

