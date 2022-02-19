import React, { useMemo } from 'react';
import Page from '../../components/Page';
import styled from 'styled-components';
import Label from '../../components/Label';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import HomeImage from '../../assets/img/background.jpg';
// import CashImage from '../../assets/img/logo_hermes4.png';
import AvaxLogo from '../../assets/img/avaxlogo.png';
// import Image from 'material-ui-image';
// import styled from 'styled-components';
// import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
// import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import { Box, Button, CardContent, Grid } from '@material-ui/core';
import { Card as Card2 } from '@material-ui/core';
import Card from '../../components/Card';
import Modal from '../../components/Modal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('SNO-JOE-LP');
  const tShareFtmLpStats = useLpStats('SNOSHARE-SNO-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://app.pangolin.exchange/#/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://app.pangolin.exchange/#/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const displayTombBalance = useMemo(() => getDisplayBalance(tombBalance), [tombBalance]);
  const tombBalanceinDollars = (displayTombBalance * tombPriceInDollars).toFixed(2);

  const tshareBalance = useTokenBalance(tombFinance.TSHARE);
  const displayTshareBalance = useMemo(() => getDisplayBalance(tshareBalance), [tshareBalance]);
  const tshareBalanceinDollars = (displayTshareBalance * tSharePriceInDollars).toFixed(2);

  const tbondBalance = useTokenBalance(tombFinance.TBOND);
  const displayTbondBalance = useMemo(() => getDisplayBalance(tbondBalance), [tbondBalance]);
  const tbondBalanceinDollars = (displayTbondBalance * tBondPriceInFTM).toFixed(2);



  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
    color: #E6E6E6;
  `;

  const Row = styled.div`
  font-family: roboto, cursive;
  align-items: center;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  margin-bottom: 8px;
`;

  const [onPresentModal] = useModal(
    <Modal>
    <Box p={4}>
              <h1 style={{ color: '#FFAE00'}}>Welcome to</h1>
              <h1>Hermes Finance</h1>
              <p>One of The first algorithmic stablecoin on Avalanche C Chain, pegged to the price of 1 AVAX via seigniorage.</p>
              <p>
                Stake your HERMES-AVAX LP in the Crete to earn HSHARE rewards.
                Then stake your earned HSHARE in the Olympus to earn more HERMES!
              </p>
              <StyledLink href='https://github.com/0xGuard-com/audit-reports/blob/master/hermes-finance/Hermes-Finance_final-audit-report.pdf'>Link to Audit Report</StyledLink>
              <p></p>  
              <img alt='0xguard' src='https://gateway.pinata.cloud/ipfs/QmYBxp5LCFmmYrZcgQQiznhsZkcfQhJ8dvwEgdBPorZ1A7?preview=1' width={200}/>
              <p></p>
              <StyledLink href='https://rugdoc.io/project/hermes-finance/'>Link to KYC</StyledLink>
              <p></p>  
              <img alt='kyc' src='https://gateway.pinata.cloud/ipfs/QmPDKWKCH8Zr5NHyQ5LzaG3H2xTiU7ui1MvoSagpLFQjWf?preview=1' width={200}/>

            </Box>
    </Modal>,
  );

  
  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        {/* Logo */}
        <Card>
          <CardContent style={{ position: 'relative' }}>
            <Box p={4}>
              <h1 style={{ color: '#FFAE00'}}>My balance</h1>
            </Box>
             <Balances>
                <StyledBalanceWrapper>
                  <TokenSymbol symbol="HERMES" />
                  <StyledBalance>
                      <StyledValue>{displayTombBalance}</StyledValue>
                      <Label text=" SNO available" />
                      <span style={{ fontSize: '15px', marginLeft:'2%'}}> (${tombBalanceinDollars ? tombBalanceinDollars : '-.----'})</span>
                  </StyledBalance>                  
                </StyledBalanceWrapper>
                <StyledBalanceWrapper>
                  <TokenSymbol symbol="HSHARE" />
                  <StyledBalance>
                    <StyledValue>{displayTshareBalance}</StyledValue>
                    <Label text=" SNOSHARE available" />
                    <span style={{ fontSize: '15px', marginLeft:'2%' }}> (${tshareBalanceinDollars ? tshareBalanceinDollars : '-.----'})</span>
                  </StyledBalance>
                </StyledBalanceWrapper>
                <StyledBalanceWrapper>
                  <TokenSymbol symbol="HBOND" />
                  <StyledBalance>
                      <StyledValue>{displayTbondBalance}</StyledValue>
                      <Label text=" SNOBOND available" />
                      <span style={{ fontSize: '15px', marginLeft:'2%' }}> (${tbondBalanceinDollars ? tbondBalanceinDollars : '-.----'})</span>
                  </StyledBalance>
               </StyledBalanceWrapper>
              </Balances>
          </CardContent>
          {/* <Paper>xs=6 sm=3</Paper> */}
        </Card>
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={6}>
            <Box p={4}>
              <h1>Welcome to</h1>
              <h1>Snowy Owl Finance</h1>
              <h4 style={{ color: '#FFAE00', marginTop:'4%' }}>Bringing more degens and utility to the Avalanche-C Chain.</h4>
              <h4 style={{ color: '#FFAE00' }}>$SNO is pegged at a ratio of 1:1 with $JOE.</h4>
              <h4 style={{ color: '#FFAE00', marginBottom: '3%' }}>Earn and stake $SNOSHARE to help peg $SNO with seigniorage.</h4>

            </Box>

            <Grid item xs={20} sm={12} style={{ display: 'flex'}}>
          <Card style={{ borderRadius: '20px', backgroundColor: '#161414'}}>
            <CardContent style={{ margin: '20px'}}>
              <h1>Total Value Locked</h1>
              <CountUp style={{ fontSize: '40px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>



        </Grid>
       {/* TVL */}
       



         {/* Wallet */}
       {/* <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
          {/*    <Button color="primary" href="/olympus" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button href="/crete" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyTombAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy HERMES
              </Button>
              <Button variant="contained" target="_blank" href={buyTShareAddress} className={classes.button}>
                Buy HSHARE
              </Button>
            </CardContent>
          </Card>
       </Grid> */}

        {/* TOMB */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent style={{ position: 'relative' }}>
               <Box align='center' mt={2}>
                  <TokenSymbol symbol="HERMES" />
              </Box>
              <h2 align='center'>SNO</h2>
              <p align='center'>Current Price</p>
              <Box align='center'>
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} <img alt="logo" style={{ width: '30px'}} src={AvaxLogo} /></span>
              </Box>
              <Box align='center' marginBottom={3}>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <Row>
              <span style={{ fontSize: '14px' }}>
                Market Cap:<br />
                Circulating Supply:  <br />
                Total Supply:
              </span>
              <span style={{ fontSize: '14px' }}>
                ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                {tombCirculatingSupply} <br />
                {tombTotalSupply}
              </span>
              </Row>
              <Box>
              <Button
                color="primary"
                target="_blank"
                href={buyTombAddress}
                variant="contained"
                style={{ marginTop: '10px', borderRadius:'10px', width: '100%'}}
                className={classes.button}
              >
                Purchase
              </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TSHARE */}
        <Grid  item xs={12} sm={4}>
          <Card>
            <CardContent style={{ position: 'relative' }}>
               <Box align='center' mt={2}>
                  <TokenSymbol symbol="HSHARE" />
              </Box>
              <h2 align='center'>SNOSHARE</h2>
              <p align='center'>Current Price</p>
              <Box align='center'>
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} <img alt="logo" style={{ width: '30px'}} src={AvaxLogo} /></span>
              </Box>
              <Box align='center' marginBottom={3}>
                <span style={{ fontSize: '16px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <Row>
              <span style={{ fontSize: '14px' }}>
                Market Cap:  <br />
                Circulating Supply:  <br />
                Total Supply: 
              </span>
              <span style={{ fontSize: '14px' }}>
                 ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                 {tShareCirculatingSupply} <br />
                 {tShareTotalSupply}
              </span>
              </Row>
              <Box>
              <Button
                color="primary"
                target="_blank"
                href={buyTShareAddress}
                variant="contained"
                style={{ marginTop: '10px', borderRadius:'10px', width: '100%'}}
                className={classes.button}
              >
               Purchase
              </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent style={{ position: 'relative' }}>
              <Box  align="center" mt={2}>
                  <TokenSymbol symbol="HBOND" />
              </Box>
              <h2 align="center">SNOBOND</h2>
              <p align="center">Current Price</p>
              <Box align="center">
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} <img alt="logo" style={{ width: '30px'}} src={AvaxLogo} /></span>
              </Box>
              <Box align='center' marginBottom={3}>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <Row>
              <span style={{ fontSize: '14px' }}>
                Market Cap:  <br />
                Circulating Supply:  <br />
                Total Supply: 
              </span>
              <span style={{ fontSize: '14px' }}>
                 ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                {tBondCirculatingSupply} <br />
                 {tBondTotalSupply}
              </span>
              </Row>
              <Box>
              <Button
                color="primary"
                target="_blank"
                href="/tartarus"
                variant="contained"
                style={{ marginTop: '10px', borderRadius:'10px', width: '100%'}}
                className={classes.button}
              >
                Purchase or Redeem
              </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>SNO-JOE LP</h2>
              <Box mt={2}>
                  <TokenSymbol symbol="SNO-JOE-LP" />
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} SNO /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} JOE
                </span>
              </Box>
              <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>SNOSHARE-wXDAI LP</h2>
              <Box mt={2}>
                  <TokenSymbol symbol="SNOSHARE-SNO-LP" />
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} SNOSHARE /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} wXDAI
                </span>
              </Box>
              <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 2.5%;
  margin-right: 2.5%;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 1%;
`;

export default Home;
