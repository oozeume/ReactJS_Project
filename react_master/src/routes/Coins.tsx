import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
import Switch from 'react-switch';
import { useEffect, useState } from 'react';
import LightIcon from '../images/light-mode.svg';
import DarkIcon from '../images/dark-mode.svg';

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    setDarkAtom((prev) => !prev);
  };

  useEffect(() => {
    isDark ? setChecked(true) : setChecked(false);
  }, []);

  return (
    <>
      <Container>
        <Helmet>
          {/* 문서의 head로 갈 부분 */}
          <title>코인</title>
        </Helmet>
        <Header>
          <Title>코인</Title>
          <Switch
            onChange={handleChange}
            checked={checked}
            offColor="#e0e0e0"
            onColor="#512da8"
            checkedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 20,
                }}
              >
                <img width="14px" src={DarkIcon} alt="" />
              </div>
            }
            uncheckedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 20,
                }}
              >
                <img width="18px" src={LightIcon} alt="" />
              </div>
            }
          />
        </Header>
        {isLoading ? (
          <Loader>Loading</Loader>
        ) : (
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name, rank: coin.rank }}
                >
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </>
  );
}

export default Coins;

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
`;
const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardbgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
