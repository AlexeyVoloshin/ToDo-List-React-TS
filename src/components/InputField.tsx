import React from 'react'

interface IProps {
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => void,
}



export const InputField: React.FC<IProps> = ({text, handleSubmit,setText}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value) 
  return (
    <>
      <label htmlFor='textInpout' />
      <input id="textInpout"  value={text} onChange={handleInput}/>
      <button onClick={handleSubmit}>Add Todo</button>
      </>
  )
}