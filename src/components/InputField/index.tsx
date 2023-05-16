import React from 'react';
import styles from './InputField.module.css';
import { Button } from '../Button';

interface IProps {
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void,
}



export const InputField: React.FC<IProps> = ({text, handleSubmit,setText}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value) 
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className={styles.input_wrapper}>
        <label htmlFor='textInpout' />
        <input id="textInpout"  value={text} onChange={handleInput} className={styles.input}/>
      </div>
      <Button type='submit' />
    </form>
      
    </>
  )
}