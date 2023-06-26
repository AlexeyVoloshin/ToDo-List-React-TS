import React from "react";
import { useAppDispatch } from "../../hook";
import { deleteTodo, toggleStatus } from "../../store/todoSlice";
import styles from "./TodoItem.module.css";

interface ItodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoItem: React.FC<ItodoItemProps> = ({
  id,
  completed,
  title,
}) => {
  const dispatch = useAppDispatch();

  const handleTodoComplete = () => {
    dispatch(toggleStatus(id));
  };

  const handleRemoveTodo = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <label htmlFor={`listItem-${id}`}>
      <li className={styles.list_item}>
        <input
          id={`listItem-${id}`}
          type="checkbox"
          checked={completed}
          onChange={handleTodoComplete}
        />
        <span>{title}</span>
        <span className={styles.delete} onClick={handleRemoveTodo}>
          &times;
        </span>
      </li>
    </label>
  );
};
