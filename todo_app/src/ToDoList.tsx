import React, { useState } from 'react';

function ToDoList() {
  const [text, setText] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setText(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(text);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={text} placeholder="Write a to do" />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default ToDoList;
