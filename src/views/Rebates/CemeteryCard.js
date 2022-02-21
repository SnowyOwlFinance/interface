import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import useRebateTreasury from "../../hooks/useRebateTreasury"
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useModal from '../../hooks/useModal';
import useTokenBalance from '../../hooks/useTokenBalance';
import DepositModal from './components/DepositModal';
import useTombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../../components/TokenSymbol';
import Web3 from "web3"
import { makeStyles } from '@material-ui/core/styles';

const web3 = new Web3()
const BN = n => new web3.utils.BN(n)

const useStyles = makeStyles((theme) => ({
  black: {
    color: "#000000 !important"
  }
}));

const CemeteryCard = ({ bank }) => {

  const tombFinance = useTombFinance();
  const classes = useStyles()

  const rebateStats = useRebateTreasury()

  const [approveStatus, approve] = useApprove(tombFinance.externalTokens[bank.depositTokenName], "0x4CAeefa4d5Eea2070AF83146fDe8ACb4A15e7edb");

  const tokenBalance = useTokenBalance(tombFinance.externalTokens[bank.depositTokenName]);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={async (value) => {
        if (!window.ethereum) return
        const account = (await window.ethereum.request({ method: "eth_accounts" }))[0]
        if (!account) return
         window.ethereum.request({
           method: "eth_sendTransaction",
           params: [{
              from: account,
              to: rebateStats.RebateTreasury._address,
              data: rebateStats.RebateTreasury.methods.bond(tombFinance.externalTokens[bank.depositTokenName].address, BN(Math.floor(value * 10000)).mul(BN(10).pow(BN(14)))).encodeABI()
          }]
        })
        
      }}
      tokenName={bank.depositTokenName}
      token={rebateStats.assets.find( token => token.token === tombFinance.externalTokens[bank.depositTokenName].address)}
    />,
  );

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined" style={{ border: '1px solid #000000', color: "#000000 !important", margin: "20px" }}>
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'transparent',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                color: "#000000 !important"
              }}
            >
              <TokenSymbol size={32} symbol={bank.depositTokenName} />
            </Box>
            <div className={classes.black}>
              {bank.depositTokenName}
            </div>
            <div className={classes.black}>
              {/* {bank.name} */}
              Bond {bank.depositTokenName.toUpperCase()} Earn SNO
            </div>
            {/* <Typography color="textSecondary">
              Multiplier: {bank.multiplier}
            </Typography> */}
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          {approveStatus !== ApprovalState.APPROVED ? (
              <Button
              disabled={approveStatus !== ApprovalState.NOT_APPROVED}
              variant="contained"
              color="primary"
              onClick={approve}
              >
              Approve {bank.depositTokenName}
              </Button>
          ) : (
            <Button color="primary" size="small" variant="contained" onClick={onPresentDeposit}>
              Bond
            </Button>
          )}

        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;