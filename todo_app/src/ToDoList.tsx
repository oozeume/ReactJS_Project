import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getNodeMajorVersion } from 'typescript';

interface IForm {
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
  PasswordComfirm: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      // 기본값 설정
      Email: '@naver.com',
    },
  });
  // 모든 validation을 다 마쳤을 때 호출
  const onValid = (data: any) => {};
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register('Email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: 'Only naver.com emails allowed',
              },
            })}
            placeholder="Email"
          />
          <span>{errors?.Email?.message}</span>
          <input
            {...register('FirstName', { required: 'Write here' })}
            placeholder="First Name"
          />
          <span>{errors?.FirstName?.message}</span>
          <input
            {...register('LastName', { required: 'Write here' })}
            placeholder="Last Name"
          />
          <span>{errors?.LastName?.message}</span>
          <input
            {...register('Password', {
              required: 'Write here',
              minLength: {
                value: 5,
                message: 'Your password is too short',
              },
            })}
            placeholder="Password"
          />
          <span>{errors?.Password?.message}</span>
          <input
            {...register('PasswordComfirm', { required: 'Write here' })}
            placeholder="Password Comfirm"
          />
          <span>{errors?.PasswordComfirm?.message}</span>
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default ToDoList;
