import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  const navigate = useNavigate();
  return (
    <StHome>
      <h1>킹주영 월드컵</h1>
      <button onClick={() => navigate('/game')}>시작</button>
    </StHome>
  );
}

const StHome = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h1 {
    font-size: 200px;
    margin-bottom: 50px;
  }
  & > button {
    font-size: 60px;
    padding: 20px;
    border-radius: 40px;
    background-color: #f9ffa7;
  }
`;
