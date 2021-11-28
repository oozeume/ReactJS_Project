import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  Todo: string;
  ExtraError?: string; // 필수가 아닐 때 작성하는 방법
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      // 기본값 설정
    },
  });

  // 유효하다면 실행할 함수
  const handleValid = (data: IForm) => {
    setValue('Todo', '');
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register('Todo', {
              required: 'please write todo',
            })}
            placeholder="Write a to do"
          />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default ToDoList;
