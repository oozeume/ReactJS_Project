import { atom, selector } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[]; // board 와  todo 배열
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});
