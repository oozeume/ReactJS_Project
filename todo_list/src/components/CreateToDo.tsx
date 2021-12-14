import {useForm } from 'react-hook-form';

interface FormData {
  
}

function CreateToDo() {
  const {register} = useForm<FormData>();
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="write todo" {
          ...register('Todo', {required: 'please write todo'})
        } />
        <button type="button">Add</button>
      </form>
    </>
  );
}

export default CreateToDo;