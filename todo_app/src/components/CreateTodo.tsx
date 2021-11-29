import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';
interface IForm {
  Todo: string;
}

// Todo 생성 Form 컴포넌트
function CrateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  // 유효하다면 실행할 함수
  const handleValid = ({ Todo }: IForm) => {
    setToDos((oldToDos) => [
      { text: Todo, id: Date.now(), category: category },
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
