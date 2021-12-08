import React from 'react';
import { useRecoilState } from 'recoil';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { toDoState } from './atom';
import Board from './components/Board';

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // 드래그가 끝났을 때 실행되는 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        // 변화가 일어난 board만 복사
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        // 1. 움직임이 있는 source 객체에서 item 인덱스 삭제
        boardCopy.splice(source.index, 1);
        // 2. 삭제한 item을 destination.index로 넣는다.
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        // 1) source board의 복사본을 만든다. 이동이 시작된 지점의 boardId를 알수있다
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board
                key={boardId}
                toDos={toDos[boardId]}
                droppableId={boardId}
              />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  min-height: 200px;
  gap: 10px;
`;
