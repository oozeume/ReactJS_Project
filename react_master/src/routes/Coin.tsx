import { useParams } from 'react-router';

interface RouteParams {
  coinId: string;
}

function Coin() {
  const params = useParams() as RouteParams;
  const coinId = params.coinId;

  return (
    <>
      <h1>Coin: {coinId}</h1>
    </>
  );
}

export default Coin;
