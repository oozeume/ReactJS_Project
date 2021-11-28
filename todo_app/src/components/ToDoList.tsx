import React from 'react';
import { useRecoilValue } from 'recoil';
import { toDoState } from '../atoms';
import CreateTodo from './CreateTodo';
import ToDo from './Todo';

// Todo List 컴포넌트
function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <>
      <div>
        <h1>Todo</h1>
        <hr />
        <CreateTodo />
        <ul>
          {toDos.map((Todo) => (
            <ToDo {...Todo} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
