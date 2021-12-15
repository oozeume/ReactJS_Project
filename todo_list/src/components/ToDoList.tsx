import Select from "react-select";
import CreateToDo from "./CreateToDo";

function ToDoList() {
  return (
    <>
    <h1>ToDo-List</h1>
    <select>
      <option value="">TO DO</option>
      <option value="">DOING</option>
      <option value="">DONE</option>
    </select>
    <CreateToDo />
    </>
  );
}

export default ToDoList;