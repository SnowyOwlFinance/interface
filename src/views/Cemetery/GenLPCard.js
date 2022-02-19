import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import TokenSymbol from '../../components/TokenSymbol';
import useLpStats from '../../hooks/useLpStats';

const GenLPCard = () => {
  const tombFtmLpStats = useLpStats('SNO-JOE-LP');
  const tShareFtmLpStats = useLpStats('SNOSHARE-SNO-LP');
  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  return (
    <Grid   container
    direction="column"
    alignItems="center"
    justifyContent="center">
    <Card>
      <CardContent align="center">
          <Typography variant="h5" component="h2">
              SNO-JOE-LP
            </Typography>
        <Box mt={2}>
            <TokenSymbol symbol="SNO-JOE-LP" />
        </Box>
        <Box mt={2}>
        </Box>
        <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
            {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} HERMES /{' '}
            {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} AVAX
          </span>
        </Box>
        <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
        <span style={{ fontSize: '12px' }}>
          Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
          Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
        </span>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
          <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/crete/HermesAvaxLPHShareRewardPool/`}>
            View
          </Button>
        </CardActions>
    </Card>
    </Grid>
  );
};

export default GenLPCard;
