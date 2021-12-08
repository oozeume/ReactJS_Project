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
            type="line"
            series={[
              // 모든 data 들어있음
              {
                name: 'Price',
                data: data?.map((price) => price.close),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: 'transparent',
              },
              grid: { show: false },
              stroke: {
                curve: 'smooth',
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: 'datetime',
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: 'gradient',
                gradient: { gradientToColors: ['blue'], stops: [0, 100] },
              },
              colors: ['#0fbcf9'],
              tooltip: {
                y: {
                  formatter: (value) => `${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </h1>
    </>
  );
}

export default Chart;
