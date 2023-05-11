import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodoItem } from '../types'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
            
        } catch (error: any) {
            return rejectWithValue(error?.message)
        }
       
    }
)
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id: string, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });

            if(!response.ok) {
                throw new Error('Can\'t delete task. Server error.');
            }
            dispatch(removeTodo({id}))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id: string, {rejectWithValue, dispatch, getState}) {
        
        const todo =( getState() as any ).todos.list.find((todo: ITodoItem) => todo.id === id)
        
        try {
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
                throw new Error('Can\'t toggle status. Server error.')
            }
            const data = await response.json();
            console.log(data);
            
            dispatch(toggleTodoComplete({id}))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text: string, {rejectWithValue, dispatch}) {
        try {
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
                throw new Error('Can\'t add task. Server error.')
            }
            const data = await response.json()
            dispatch(addTodo(data))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
const setError = (status: any, action: any) => {
    status.status = 'rejected';
    status.error = action.payload;
}


type TodosState = {
    list: ITodoItem[],
    status: null | string,
    error: null,
}

const initialState: TodosState = {
    list: [],
    status: null,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    // initialState: {
    //     list: [] as ITodoItem[],
    //     status: null,
    //     error: null,
    // },
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodoItem>) {
            state.list.push(action.payload)
        },
        removeTodo(state, action: PayloadAction<{id: string}>) {
            state.list = state.list.filter((todo) => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action: PayloadAction<{id: string}>) {
            const toggledTodo = state.list.find((todo) => todo.id === action.payload.id)
            toggledTodo!.completed = !toggledTodo!.completed;
        },
    },
    extraReducers: {
        [fetchTodos.pending as any]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled as any]: (state, action) => {
            state.status = 'resolved';
            state.list = action.payload;
        },
        [fetchTodos.rejected as any]: setError,
        [deleteTodo.rejected as any]: setError,
        [toggleStatus.rejected as any]: setError,
    }
});

const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;