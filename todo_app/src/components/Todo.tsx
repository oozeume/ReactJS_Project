import { IToDo } from '../atoms';

// Todo 컴포넌트
function ToDo({ text }: IToDo) {
  return <li>{text}</li>;
}

export default ToDo;
