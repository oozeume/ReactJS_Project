import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, toDoSelector } from '../atoms';
import CreateTodo from './CreateTodo';
import ToDo from './Todo';

// Todo List 컴포넌트
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
        <hr />
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>TO DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </select>
        <CreateTodo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </div>
    </>
  );
}

export default ToDoList;
