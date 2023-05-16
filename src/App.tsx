import { Suspense, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';

import './App.css';
import { InputField } from './components/InputField';
import { useAppDispatch, useAppSelector } from './hook';
import { addNewTodo, fetchTodos } from './store/todoSlice';
import { Header } from './components/Header';

function App() {
  const dispatch = useAppDispatch();

  const [text, setText] = useState('')
  const {loading, error} = useAppSelector((state) => state.todos)
  
  const addTask = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addNewTodo(text));
    setText('');
  }

  useEffect(() => {
      dispatch(fetchTodos())
  }, [dispatch])
  
  return (
    <div className="App">
      <Header title='ToDo List'/>
      <div className='content'>
      <InputField handleSubmit={addTask} setText={setText}  text={text}/>
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <Suspense fallback={<h2>Loading todo list</h2>}>
      <TodoList />
      </Suspense>
      </div>
    </div>
  );
}

export default App;
