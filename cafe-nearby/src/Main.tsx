import axios from 'axios';
import { useEffect, useState } from 'react';

import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';

export interface CafeInfo {
  name: string;
  phone: string;
  distance: string;
}

interface Position {
  x: number;
  y: number;
}

export type ResponseStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

export default function Main() {
  const [cafeList, setCafeList] = useState<CafeInfo[] | undefined>();
  const [position, setPosition] = useState<Position | undefined>();
  const [searchStatus, setSearchStatus] = useState<ResponseStatus>('IDLE');
  const [isAutoPosition, setIsAutoPosition] = useState(false);
  const getCafeList = async (searchWord: string) => {
    if (!position) {
      setSearchStatus('ERROR');
      return;
    }
    setSearchStatus('PENDING');
    try {
      const result = await axios.get(
        `https://dapi.kakao.com/v2/local/search/${
          isAutoPosition ? 'category' : 'keyword'
        }`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
          },
          params: {
            x: position.x,
            y: position.y,
            radius: 1000,
            query: searchWord,
            category_group_code: 'CE7',
          },
        }
      );
      setCafeList(
        result.data.documents.map((cafe: any) => ({
          name: cafe.place_name,
          phone: cafe.phone,
          distance: cafe.distance,
        }))
      );
      setSearchStatus('SUCCESS');
    } catch (error) {
      setSearchStatus('ERROR');
      console.log(error);
    }
  };

  const handleClickCheckBox = () => {
    setIsAutoPosition((prev) => !prev);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        x: position.coords.longitude,
        y: position.coords.latitude,
      });
    });
  }, []);

  useEffect(() => console.log(isAutoPosition), [isAutoPosition]);

  return (
    <div>
      <div>카페 찾기</div>
      <SearchBar
        onSubmit={getCafeList}
        isAutoPosition={isAutoPosition}
        onClickCheckBox={handleClickCheckBox}
      ></SearchBar>
      <SearchResult cafeList={cafeList} searchStatus={searchStatus} />
    </div>
  );
}
