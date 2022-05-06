import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { juyeongList } from '../data';
import { CurrentFighter, Direction, Juyeong } from '../type';
import { shuffleArray } from '../utils/array';

export default function Game() {
  const [round, setRound] = useState(juyeongList.length);
  const [fighterList, setFighterList] = useState(juyeongList.slice(0, round));
  const [winnerList, setWinnerList] = useState<Juyeong[]>([]);
  const [currentFighter, setCurrentFighter] = useState<CurrentFighter | null>(null);
  const navigate = useNavigate();

  const initGame = () => {
    shuffleArray<Juyeong>(juyeongList);
    setCurrentFighter({ left: fighterList[0], right: fighterList[1] });
  };

  const getRoundText = () => {
    if (round <= 4) return round === 4 ? '준결승' : '결승';
    return `${round}강`;
  };

  const choice = (direction: Direction) => {
    if (!currentFighter) return;
    if (round === fighterList.length) {
      setWinnerList(() => [direction === 'LEFT' ? currentFighter.left : currentFighter.right]);
    } else {
      setWinnerList((current) => [
        ...current,
        direction === 'LEFT' ? currentFighter.left : currentFighter.right,
      ]);
    }
    setFighterList((current) => current.slice(2));
  };

  const goNextRound = () => {
    if (round > 2) {
      setRound((current) => current / 2);
      setFighterList(winnerList);
    }
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (currentFighter && fighterList.length === 0) {
      goNextRound();
    } else {
      setCurrentFighter({ left: fighterList[0], right: fighterList[1] });
    }
  }, [fighterList]);

  useEffect(() => {
    console.log(winnerList);
    if (round === 2) navigate(`/result/${winnerList[0].name}`);
  }, [winnerList]);

  return currentFighter ? (
    <StGame>
      <header>
        <h1>킹주영 월드컵 {getRoundText()}</h1>
        <div>{`${(round - fighterList.length) / 2 + 1}/${round / 2}`}</div>
      </header>
      <main>
        <section>
          <article onClick={() => choice('LEFT')}>
            <img src={currentFighter.left.src} alt="left-juyeong" />
            <div>{currentFighter.left.name}</div>
          </article>
          <article onClick={() => choice('RIGHT')}>
            <img src={currentFighter.right.src} alt="right-juyeong" />
            <div>{currentFighter.right.name}</div>
          </article>
        </section>
        <div>vs</div>
      </main>
    </StGame>
  ) : (
    <></>
  );
}

const StGame = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > header {
    width: 100%;
    padding: 20px 0;
    & > h1 {
      text-align: center;
      font-size: 80px;
    }
  }
  & > main {
    position: relative;
    width: 100%;
    height: 100%;
    & > * {
      position: absolute;
    }
    & > section {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      & > article {
        width: 50%;
        height: 100%;
        position: relative;
        & > * {
          position: absolute;
        }
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all ease 1s;
        }
        & > img:hover {
          transform: scale(1.1);
        }
        & > div {
          top: 80%;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 50px;
        }
      }
    }
    & > div {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 200px;
      color: pink;
    }
  }
`;
