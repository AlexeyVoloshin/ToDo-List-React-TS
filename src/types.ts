export interface IFunctionHendler {
    removeTodo: (id: string) => void,
    toggleTodoComplete: (id: string) => void,
}

export interface ITodoItem {
    id: string,
    title: string,
    completed: boolean,
}
