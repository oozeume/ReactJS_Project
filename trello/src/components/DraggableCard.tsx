import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <>
      <Draggable key={toDoId} draggableId={toDoId + ''} index={index}>
        {(provided, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {toDoText}
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default React.memo(DragabbleCard);

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? 'tomato' : props.theme.cardColor};
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  box-shadow: ${(props) => (props.isDragging ? '0px 2px 5px' : 'none')};
`;
