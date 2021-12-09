import React from 'react';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
