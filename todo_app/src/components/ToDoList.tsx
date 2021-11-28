import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

interface IForm {
  Todo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

const toDoState = atom<IToDo[]>({
  key: 'Todo',
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  // 유효하다면 실행할 함수
  const handleValid = ({ Todo }: IForm) => {
    setToDos((oldToDos) => [
      { text: Todo, id: Date.now(), category: 'TO_DO' },
      ...oldToDos,
    ]);
    setValue('Todo', ''); // 작성 후에 빈 값으로 바꿔줌
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
        <hr />
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register('Todo', {
              required: 'please write todo',
            })}
            placeholder="Write a to do"
          />
          <button>Add</button>
        </form>
        <ul>
          {toDos.map((Todo) => (
            <li key={Todo.id}>{Todo.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
