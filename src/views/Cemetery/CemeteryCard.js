import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import TokenSymbol from '../../components/TokenSymbol';
import useLpStats from '../../hooks/useLpStats';

const CemeteryCard = () => {
  const tombFtmLpStats = useLpStats('SNO-JOE-LP');
  const tShareFtmLpStats = useLpStats('SNOSHARE-SNO-LP');
  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  return (
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
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
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            SNOSHARE-SNO-LP
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="SNOSHARE-SNO-LP" />
          </Box>
          <Box mt={2}>
          </Box>
          <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} HSHARE /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} AVAX
                </span>
          </Box>
          <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/crete/HshareAvaxLPHShareRewardPool/`}>
              View
            </Button>
          </CardActions>
      </Card>
      </Grid>
      </Grid>
  );
};

export default CemeteryCard;
