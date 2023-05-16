import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "../types";

const initialState = ThemeState.light;

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => state === ThemeState.light ? ThemeState.dark : ThemeState.light,
    },
});

export const {changeTheme} = themeSlice.actions;