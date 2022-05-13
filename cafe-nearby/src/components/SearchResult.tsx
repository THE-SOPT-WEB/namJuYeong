import { CafeInfo, ResponseStatus } from '../Main';
import CafeItem from './CafeItem';

interface SearchResultProps {
  cafeList: CafeInfo[] | undefined;
  searchStatus: ResponseStatus;
}

export default function SearchResult(props: SearchResultProps) {
  const { cafeList, searchStatus } = props;
  if (searchStatus === 'PENDING') {
    return <div>Loading...</div>;
  }
  return cafeList === undefined ? (
    <></>
  ) : cafeList.length ? (
    <div>
      {cafeList.map((cafe) => (
        <CafeItem key={cafe.name} cafe={cafe} />
      ))}
    </div>
  ) : (
    <div>
      검색 결과가 없어요. <br />
      입력하신 위치와 실제 위치가 다를지 몰라요.
    </div>
  );
}
