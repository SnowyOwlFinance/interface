import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, /*Button,*/ Card, CardContent,/*Typography,*/ Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
// import useRedeem from '../../hooks/useRedeem';
// import { Bank as BankEntity } from '../../tomb-finance';
// import useTombFinance from '../../hooks/useTombFinance';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const classes = useStyles();
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
 // const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);

  if (!bank) {
    return (<BankNotFound />);
  }
  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      {bank?.depositTokenName === "SNO-SNOSHARE-LP" && Date.now() < 1645509600000 ? (
          <Alert variant="filled" severity="info" style={{ maxWidth: "400px", marginBottom: "20px", marginLeft: "auto", marginRight: "auto" }}>
          Pool starts at 1:00 AM Eastern (at next epoch)
        </Alert>
      ) : (<></>)}
      <Box>
        <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}>
          <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
            <Card style={{background: '#161414', borderRadius: '15px', height: '120px'}} className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#5686d6'}}>APR</h3>
                <h2 style={{ fontWeight: 'lighter'}}>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
            <Card style={{background: '#161414', borderRadius: '15px', height: '120px'}} className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#5686d6'}}>Daily APR</h3>
                <h2 style={{ fontWeight: 'lighter'}}>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
            <Card style={{background: '#161414', borderRadius: '15px', height: '120px'}} className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#5686d6'}}>Total Value Locked</h3>
                <h2 style={{ fontWeight: 'lighter'}}>${statsOnPool?.TVL}</h2>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box mt={12}>
        <StyledBank>
          <StyledCardsWrapper>
            <StyledCardWrapper>
              <Harvest bank={bank} />
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>{<Stake bank={bank} />}</StyledCardWrapper>
          </StyledCardsWrapper>
          <Spacer size="lg" />
        </StyledBank>
      </Box>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

/* const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  const tombFinance = useTombFinance();
  const tombAddr = tombFinance.TOMB.address;
  const tshareAddr = tombFinance.TSHARE.address;

  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('TOMB')) {
    pairName = 'TOMB-AVAX pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/AVAX/' + tombAddr;
  } else {
    pairName = 'HSHARE-AVAX pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/AVAX/' + tshareAddr;
  }
  return (
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank">
          {`Provide liquidity for ${pairName} now on Pangolin Exchange`}
        </StyledLink>
      </CardContent>
    </Card>
  );
}; */
const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`; */

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
