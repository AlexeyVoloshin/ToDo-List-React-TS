import React from 'react'
import { useAppDispatch } from '../../hook';
import { deleteTodo, toggleStatus } from '../../store/todoSlice';
import styles from './TodoItem.module.css';

interface ItodoItemProps {
    id: string,
    title: string,
    completed: boolean,
}

export const TodoItem: React.FC<ItodoItemProps> = ({id, completed, title}) => {
  const dispatch = useAppDispatch();

  const handleTodoComplete = () => {
    dispatch(toggleStatus(id));
  }

  const handleRemoveTodo = () => {
    dispatch(deleteTodo(id));
  }

  return (
    <li className={styles.list_item} key={id}>
        <input type="checkbox" checked={completed} 
        onChange={handleTodoComplete}
        />
        <span>{title}</span>
        <span className='delete' 
        onClick={handleRemoveTodo}
        >&times;</span>
    </li>
  )
}
