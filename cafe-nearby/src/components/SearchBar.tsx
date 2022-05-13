import { useState } from 'react';
import styled from 'styled-components';

import Checked from '../assets/ic_checked.svg';
import Unchecked from '../assets/ic_unchecked.svg';

interface SearchBarProps {
  onSubmit: (searchWord: string) => void;
  isAutoPosition: boolean;
  onClickCheckBox: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { onSubmit, isAutoPosition, onClickCheckBox } = props;
  const [searchWord, setSearchWord] = useState('');
  return (
    <div>
      <StCheckBox>
        <input
          id="isLocal"
          checked={isAutoPosition}
          type="checkbox"
          onClick={onClickCheckBox}
        />
        <label htmlFor="isLocal" />
        <span>현재 위치 자동으로 가져오기</span>
      </StCheckBox>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(searchWord);
        }}
      >
        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="현재 위치를 입력해주세요."
          disabled={isAutoPosition}
        />
        <button>검색</button>
      </form>
    </div>
  );
}

const StCheckBox = styled.div`
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    cursor: pointer;
    padding-left: 23px;
    background-repeat: no-repeat;
    background-image: ${`url(${Unchecked})`};
  }
  input[type='checkbox']:checked + label {
    background-image: ${`url(${Checked})`};
  }
`;
