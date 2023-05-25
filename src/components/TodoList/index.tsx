import React from 'react'
import { ITodoItem } from '../../types';
import { TodoItem } from "../TodoItem";
import { useAppSelector } from "../../hook";
import styles from './TodoList.module.css';
import {  selectTodosByFilter } from '../../store/selectors';

export const TodoList: React.FC = () => {
    const todoList = useAppSelector(selectTodosByFilter)
    return (
        <ul className={styles.todoList}>
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
