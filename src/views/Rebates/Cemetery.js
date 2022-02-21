import React, { useMemo, useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from "web3"

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';

import useBanks from '../../hooks/useBanks';
import useRebateTreasury from "../../hooks/useRebateTreasury"
import useTombStats from '../../hooks/useTombStats';
import CemeteryImage from '../../assets/img/background.jpg';

const web3 = new Web3()
const BN = n => new web3.utils.BN(n)

const BackgroundImage = createGlobalStyle`
body {
  background: url(${CemeteryImage}) no-repeat !important;
  background-size: cover !important;
}
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    color: "black !important",
    height: '100%'
  },
  gridCard: {
    border: "1px solid #000000",
    color: "black !important",
  },
  flex: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  alert: {
    maxWidth: "600px !important",
    marginLeft: "auto !important",
    marginRight: "auto !important"
  }
}));

const Cemetery = () => {
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const cashStat = useCashPriceInEstimatedTWAP();
  const tombStats = useTombStats();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const activeBanks = banks.filter((bank) => !bank.finished);

  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);

  const rebateStats = useRebateTreasury()
  const [claimable3omb, setClaimable3omb] = useState(0);
  const [vested, setVested] = useState(0)

  useEffect(() => {
    updateVesting()
    const interval = setInterval(updateVesting, 5000)
    return () => clearInterval(interval)
  }, [])

  async function updateVesting() {
    if (!window.ethereum) return
    const address = (await window.ethereum.request({ method: "eth_accounts" }))[0]
    if (!address) return

    const claimable = await rebateStats.RebateTreasury.methods.claimableTomb(address).call()
    const vesting = await rebateStats.RebateTreasury.methods.vesting(address).call()
    setClaimable3omb(+web3.utils.fromWei(claimable))
    setVested(+web3.utils.fromWei(BN(vesting.amount).sub(BN(vesting.claimed))))
  }

  async function claimTomb() {
    if (!window.ethereum) return
    const address = (await window.ethereum.request({ method: "eth_accounts" }))[0]
    if (!address) return
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: address,
        to: rebateStats.RebateTreasury._address,
        data: rebateStats.RebateTreasury.methods.claimRewards().encodeABI()
      }]
    })
  }

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <>
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom style={{ marginBottom: '40px', color: "#000000" }}>
                SNODAO
              </Typography>
              <Alert variant="filled" severity="info" className={classes.alert}>
                  SNO rewards from bonds are vested for 3 days linearly.
                </Alert>
              <Box mt={2}>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={3} lg={3} className={classes.gridItem}>
                    <Card className={`${classes.gridItem} ${classes.gridCard}`}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          SNO Price <small>(TWAP)</small>
                        </Typography>
                        <Typography variant="h6">{tombPriceInFTM ? tombPriceInFTM : '-.----'} JOE</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3} className={classes.gridItem}>
                    <Card className={`${classes.gridItem} ${classes.gridCard}`}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          Bond Premium
                        </Typography>
                        <Typography variant="h6">{rebateStats.bondPremium.toFixed(3)}%</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                  <Typography variant="h4" gutterBottom style={{ color: "#000000 !important", marginTop: '35px', }}>
                    Bondable Assets
                  </Typography>
                  <div className={classes.flex}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 3)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} className={classes.gridCard} />
                        </React.Fragment>
                      ))}
                  </div>
              </div>
              <Box mt={2}>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={3} lg={3} className={`${classes.gridItem}`}>
                    <Card style={{ height: "auto" }} className={classes.gridCard}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          SNO Vesting
                        </Typography>
                        <Typography variant="h6">{vested.toFixed(4)} Total Vested</Typography>
                        <Typography variant="h6">{claimable3omb.toFixed(4)} Claimable</Typography>
                        <Button color="primary" size="small" variant="contained" onClick={claimTomb} style={{ marginTop: "8px" }}>
                          CLAIM
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <UnlockWallet />
          )}
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;