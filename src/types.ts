export interface IFunctionHendler {
    removeTodo: (id: string) => void,
    toggleTodoComplete: (id: string) => void,
}

export interface ITodoItem {
    id: string,
    title: string,
    completed: boolean,
}

export enum ThemeState {
    light = 'light',
    dark = 'dark',
}

export enum FilterState {
    all = 'all',
    completed = 'completed',
    active = 'active'
}