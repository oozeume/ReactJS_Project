import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import {
  useLocation,
  useNavigate,
  useParams,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoins, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
import { ReactComponent as BackBtn } from '../images/back-button.svg';
import { PriceData } from '../interface';

// interface
interface RouteParams {
  coinId: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

function Coin() {
  const params = useParams() as RouteParams;
  const coinId = params.coinId;
  const { state } = useLocation();
  const navigate = useNavigate();
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  ); // 고유한 key값을 가지기위해 해주는 작업
  const { isLoading: tickersLoading, data: tickersdata } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000, // 5초마다 refetch
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <>
      <Container>
        <Helmet>
          {/* 문서의 head로 갈 부분 */}
          <title>
            {state?.name ? state.name : loading ? 'Loading..' : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <div
            onClick={() => {
              navigate('/');
            }}
          >
            <StyledBackBtn />
          </div>
          <Title>
            {state?.name ? state.name : loading ? 'Loading..' : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>{infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{tickersdata?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersdata?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Suply:</span>
                <span>{tickersdata?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Routes>
              <Route path="price" element={<Price coinId={coinId} />}></Route>
              <Route path="chart" element={<Chart coinId={coinId} />}></Route>
            </Routes>
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardbgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.descColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardbgColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const StyledBackBtn = styled(BackBtn)`
  fill: ${(props) => props.theme.descColor};
  width: 25px;
  height: 25px;
`;
