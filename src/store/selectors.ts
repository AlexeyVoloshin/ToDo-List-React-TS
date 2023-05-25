import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { FilterState } from "../types";

export const selectAllTodos = (state: RootState) => state.todos.list
export const selectActiveFilter = (state: RootState) => state.filter;
export const selectTheme = (state: RootState) => state.theme;

export const selectTodosByFilter = createSelector(
    [selectAllTodos,selectActiveFilter], 
    (allTodos, activeFilter) => {
        switch (activeFilter) {
            case FilterState.completed:
                return allTodos.filter(todo => todo.completed);
            case FilterState.active:
                return allTodos.filter(todo => !todo.completed);
            default:
                return allTodos;
        }
    }
);