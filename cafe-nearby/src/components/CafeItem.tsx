import { CafeInfo } from '../Main';

export default function CafeItem({ cafe }: { cafe: CafeInfo }) {
  const { name, phone, distance } = cafe;
  return (
    <div>
      <div>{name}</div>
      <div>
        <div>{phone}</div>
        <div>{distance}m</div>
      </div>
    </div>
  );
}
