import { AppState } from "../../types/todos.types";

const initialState: AppState = {
  version: 1,
  listOrder: ['list-1', 'list-2'],
  lists: {
    'list-1': {
      id: 'list-1',
      name: 'Work',
      taskIds: ['task-1', 'task-2']
    },
    'list-2': {
      id: 'list-2',
      name: 'Personal',
      taskIds: ['task-3']
    }
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Finish project report',
      notes: 'Due by end of week',
      createdAt: '2025-09-01T08:00:00Z',
      updatedAt: '2025-09-01T10:00:00Z',
      completed: false,
      priority: 'high'
    },
    'task-2': {
      id: 'task-2',
      title: 'Send client email',
      createdAt: '2025-09-01T09:00:00Z',
      updatedAt: '2025-09-01T09:30:00Z',
      completed: true,
      priority: 'med'
    },
    'task-3': {
      id: 'task-3',
      title: 'Buy groceries',
      notes: 'Milk, eggs, bread',
      dueAt: '2025-09-03T18:00:00Z',
      createdAt: '2025-09-01T11:00:00Z',
      updatedAt: '2025-09-01T11:15:00Z',
      completed: false,
      priority: 'low'
    }
  }
};

export default initialState