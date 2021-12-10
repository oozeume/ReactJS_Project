import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fetchCoinTickers } from '../api';
import { isDarkAtom } from '../atoms';
import { PriceData } from '../interface';

interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading: tickersLoading, data: tickersdata } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000, // 5초마다 refetch
    }
  );

  return (
    <Overview>
      <OverviewItem>
        <span>price :</span>
        <span>{tickersdata?.quotes.USD.price}</span>
      </OverviewItem>
      <OverviewItem>
        <span>Change rate (last 1 hours) :</span>
        <span>{tickersdata?.quotes.USD.percent_change_1h}</span>
      </OverviewItem>
      <OverviewItem>
        <span>Change rate (last 6 hours) :</span>
        <span>{tickersdata?.quotes.USD.percent_change_6h}</span>
      </OverviewItem>
      <OverviewItem>
        <span>Change rate (last 24 hours) :</span>
        <span>{tickersdata?.quotes.USD.percent_change_24h}</span>
      </OverviewItem>
    </Overview>
  );
}

export default Price;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
`;

const OverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.cardbgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
