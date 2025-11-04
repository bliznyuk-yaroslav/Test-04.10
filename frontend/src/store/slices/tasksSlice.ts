import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { api, Task } from '../../lib/api';

export interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (status?: Task['status']) => {
  const list = await api.getTasks(status);
  return list as Task[];
});

export const createTaskThunk = createAsyncThunk(
  'tasks/create',
  async (payload: { title: string; description?: string | null; status?: Task['status'] }) => {
    const t = await api.createTask(payload);
    return t as Task;
  },
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/update',
  async (payload: {
    id: number;
    data: Partial<Pick<Task, 'title' | 'description' | 'status'>>;
  }) => {
    const t = await api.updateTask(payload.id, payload.data);
    return t as Task;
  },
);

export const deleteTaskThunk = createAsyncThunk('tasks/delete', async (id: number) => {
  await api.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TasksState>) => {
    builder
      .addCase(fetchTasks.pending, (state: TasksState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state: TasksState, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state: TasksState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load tasks';
      })
      .addCase(createTaskThunk.fulfilled, (state: TasksState, action: PayloadAction<Task>) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateTaskThunk.fulfilled, (state: TasksState, action: PayloadAction<Task>) => {
        state.items = state.items.map((t: Task) =>
          t.id === action.payload.id ? action.payload : t,
        );
      })
      .addCase(deleteTaskThunk.fulfilled, (state: TasksState, action: PayloadAction<number>) => {
        state.items = state.items.filter((t: Task) => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
