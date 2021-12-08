import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { ITodo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

interface IBoardProps {
  toDos: ITodo[];
  droppableId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, droppableId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };
  const onValid = ({ toDo }: IForm) => {
    // 비워주기 전에 객체로 만들어놓기
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [droppableId]: [...allBoards[droppableId], newToDo],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <Title>{droppableId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${droppableId}`}
        ></input>
      </Form>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <BoardEl
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </BoardEl>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

const Wrapper = styled.div`
  width: 300px;
  padding-top: 0px;

  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  padding-top: 10px;
`;

interface IBoardElProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const BoardEl = styled.div<IBoardElProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? 'pink' : props.isDraggingFromThis ? 'red' : 'blue'};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
