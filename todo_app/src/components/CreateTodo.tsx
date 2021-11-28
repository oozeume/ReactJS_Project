import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
  Todo: string;
}

// Todo 생성 Form 컴포넌트
function CrateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

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
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('Todo', {
            required: 'please write todo',
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default CrateToDo;
