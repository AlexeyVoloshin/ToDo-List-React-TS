import { Suspense, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';

import './App.css';
import { InputField } from './components/InputField';
import { useAppDispatch, useAppSelector } from './hook';
import { addNewTodo, fetchTodos } from './store/todoSlice';

function App() {
  const dispatch = useAppDispatch();

  const [text, setText] = useState('')
  const {status, error} = useAppSelector((state) => state.todos)
  
  const addTask = () => {
    dispatch(addNewTodo(text));
    setText('');
  }

  useEffect(() => {
      dispatch(fetchTodos())
  }, [dispatch])
  
  return (
    <div className="App">
      <InputField handleSubmit={addTask} setText={setText}  text={text}/>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <Suspense fallback={<h2>Loading todo list</h2>}>
      <TodoList />

      </Suspense>
    </div>
  );
}

export default App;
