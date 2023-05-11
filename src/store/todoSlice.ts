import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodoItem } from '../types'

export const fetchTodos = createAsyncThunk<ITodoItem[], undefined, {rejectValue: string}>(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }
        return await response.json();
    }
)
export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function(id: string, {rejectWithValue}) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });

        if(!response.ok) {
            return rejectWithValue('Can\'t delete task. Server error.');
        }
        return id;
    }
)
export const toggleStatus = createAsyncThunk<ITodoItem, string, {rejectValue: string, state: { todos: TodosState}}>(
    'todos/toggleStatus',
    async function(id: string, {rejectWithValue, getState}) {
        
        const todo =getState().todos.list.find((todo) => todo.id === id)
        
        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });
            if(!response.ok){
                return rejectWithValue('Can\'t toggle status. Server error.')
            }
            return (await response.json() as ITodoItem);
        }
        return rejectWithValue('No such todo in list!')
    }
)
export const addNewTodo = createAsyncThunk<ITodoItem, string, { rejectValue: string }>(
    'todos/addNewTodo',
    async function (text: string, {rejectWithValue}) {
            const todo = {
                title: text,
                userId: 1,
                completed: false,
            };

            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo),
            });

        if(!response.ok){
            return rejectWithValue('Can\'t add task. Server error.')
        }
        return (await response.json() as ITodoItem)
    }
)

type TodosState = {
    list: ITodoItem[],
    loading: boolean,
    error: null | string,
}

const initialState: TodosState = {
    list: [],
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(addNewTodo.pending, (state) => {
            state.error = null;
        })
        .addCase(addNewTodo.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        .addCase(toggleStatus.fulfilled, (state, action) => {
            const toggledTodo = state.list.find((todo) => todo.id === action.payload.id)
            toggledTodo!.completed = !toggledTodo!.completed; 
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.list = state.list.filter((todo) => todo.id !== action.payload)
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}