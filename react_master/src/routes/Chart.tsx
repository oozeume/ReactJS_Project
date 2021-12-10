import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000, // 10초마다 refetch
    }
  );

  return (
    <>
      <h1>
        {isLoading ? (
          'Loading Chart...'
        ) : (
          <ApexChart
            type="candlestick"
            series={[
              // 모든 data 들어있음
              {
                name: 'Price',
                data: data?.map((price) => [
                  new Date(price.time_close),
                  price.open.toFixed(0),
                  price.high.toFixed(0),
                  price.low.toFixed(0),
                  price.close.toFixed(0),
                ]),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
              },
              chart: {
                type: 'candlestick',
                height: 300,
                width: 500,
                toolbar: {
                  show: true,
                },
                background: 'transparent',
              },
              title: {
                // text: 'CandleStick Chart',
                align: 'left',
              },
              grid: { show: false },
              stroke: {
                curve: 'smooth',
                width: 1,
              },
              yaxis: {
                show: false,
                tickAmount: 6,
                tooltip: {
                  enabled: true,
                },
              },
              xaxis: {
                labels: {
                  format: 'MM/dd',
                },
                type: 'datetime',
                categories: data?.map((price) => price.time_close),
              },
              colors: ['#0fbcf9'],
            }}
          />
        )}
      </h1>
    </>
  );
}

export default Chart;
