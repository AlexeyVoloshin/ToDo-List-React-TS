import { createSlice } from '@reduxjs/toolkit';
import { FilterState } from '../types';

const initialState = FilterState.all;

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (_, action) => action.payload,
    },
});

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;