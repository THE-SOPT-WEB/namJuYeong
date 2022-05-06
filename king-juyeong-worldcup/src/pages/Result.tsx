import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { juyeongList } from '../data';
import { default as crown } from '../assets/crown.png';

export default function Result() {
  const { name: winnerName } = useParams();
  const navigate = useNavigate();
  const winner = juyeongList.find((juyeong) => juyeong.name === winnerName);
  return (
    <StResult>
      <h1>우승자!</h1>
      <h2>{winner && winner.name}</h2>
      <div>
        <img src={crown} />
        <div>
          <img src={winner && winner.src} />
        </div>
      </div>
      <button onClick={() => navigate('/game')}>다시하기</button>
    </StResult>
  );
}

const StResult = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  & > h1 {
    font-size: 40px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  & > h2 {
    font-size: 80px;
    margin-bottom: 100px;
  }
  & > div {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    & > * {
      position: absolute;
    }
    & > *:first-child {
      width: 100px;
      top: 20px;
      left: 50%;
      z-index: 100;
      transform: translateX(-50%);
    }
    & > *:nth-child(2) {
      width: 500px;
      height: 100%;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  & > button {
    margin-top: 60px;
    background-color: #bfebff;
    font-size: 40px;
    padding: 20px;
    border-radius: 30px;
  }
`;
