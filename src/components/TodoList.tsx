import React from 'react'
import { ITodoItem } from '../types';
import { TodoItem } from "./TodoItem";
import { useAppSelector } from "../hook";

export const TodoList: React.FC = () => {
    const todoList = useAppSelector((state) => state.todos.list)
  console.log('todoList: ',todoList);
  
    return (
    <ul>
        {
            todoList?.map((todo: ITodoItem) => (
                <TodoItem 
                    key={todo.id} 
                    {...todo}
                />
            ))
        }
  </ul>
  )
}
