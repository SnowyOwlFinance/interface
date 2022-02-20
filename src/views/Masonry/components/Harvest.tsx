import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, CardContent, Typography } from '@material-ui/core';
import Card from '../../../components/Card';
import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
// import CardIcon from '../../../components/CardIcon';
import useClaimRewardTimerMasonry from '../../../hooks/masonry/useClaimRewardTimerMasonry';
import useClaimRewardCheck from '../../../hooks/masonry/useClaimRewardCheck';
import ProgressCountdown from './../components/ProgressCountdown';
import useHarvestFromMasonry from '../../../hooks/useHarvestFromMasonry';
import useEarningsOnMasonry from '../../../hooks/useEarningsOnMasonry';
import useTombStats from '../../../hooks/useTombStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useRedeemOnMasonry from '../../../hooks/useRedeemOnMasonry';
import useStakedBalanceOnMasonry from '../../../hooks/useStakedBalanceOnMasonry';
import useWithdrawCheck from '../../../hooks/masonry/useWithdrawCheck';



const Harvest: React.FC = () => {
  const { onRedeem } = useRedeemOnMasonry();
  const tombStats = useTombStats();
  const { onReward } = useHarvestFromMasonry();
  const earnings = useEarningsOnMasonry();
  const canClaimReward = useClaimRewardCheck();
  const stakedBalance = useStakedBalanceOnMasonry();
  const canWithdraw = useWithdrawCheck();

  const tokenPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { from, to } = useClaimRewardTimerMasonry();

  return (
    <Box>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
                <TokenSymbol symbol="TOMB" />
              <Value value={getDisplayBalance(earnings)} />
              <Label text={`≈ $${earnedInDollars}`} />
              <Label text="SNO Earned" />
            </StyledCardHeader>
            <StyledCardActions>
              <Button
                onClick={onReward}
                color="primary"
                variant="contained"
                disabled={earnings.eq(0) || !canClaimReward}
                style={{ borderRadius: '15px', width: '250px' }}
              >
                Claim Reward
              </Button>
            </StyledCardActions>
            <Button
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                color="primary"
                variant="contained"
                style={{ borderRadius: '15px', width: '250px', marginTop: '10px' }}
              >
                Claim and Withdraw
              </Button>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canClaimReward ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Claim available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
