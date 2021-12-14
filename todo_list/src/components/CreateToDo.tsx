import {useForm } from 'react-hook-form';

function CreateToDo() {
  const {register} = useForm();

  
  return (
    <>
      <form action="">
        <input type="text" placeholder="write todo" {
          ...register('Todo', {required: 'please write todo'})
        } />
        <button type="button">Add</button>
      </form>
    </>
  );
}

export default CreateToDo;