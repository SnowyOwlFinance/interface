import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';


import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import GenesisCard from './GenesisCard';
import GenLPCard from './GenLPCard';
import CemeteryImage from '../../assets/img/background.jpg';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const Cemetery = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="primary.dark" align="center" variant="h2" gutterBottom>
                Farms
              </Typography>

              <Box mt={5}>
                {/* <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="primary.dark" align='center' variant="h4" gutterBottom style={{ marginBottom: '3%' }}>
                    Earn HSHARE by staking LP
                  </Typography>
                  <Grid container spacing={3}>
                    <CemeteryCard />
                  </Grid>
                </div> */}
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="primary.dark" align='center' variant="h4" gutterBottom style={{ marginBottom: '3%' }}>
                    SNOSHARE Pools
                  </Typography>
                  <Grid container spacing={3}>
                    <CemeteryCard />
                  </Grid>
                </div>
{/* 
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Earn TOMB by staking LP
                  </Typography>
                  <Alert variant="filled" severity="warning">
                    All below pools have ended. Please unstake and collect your rewards.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                      </div> 

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                      </div> */}
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
