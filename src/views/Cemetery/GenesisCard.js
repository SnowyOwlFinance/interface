import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import TokenSymbol from '../../components/TokenSymbol';

const GenesisCard = () => {
  return (
    <Grid container spacing={3}>
    <Grid item xs={12} sm={3}>
    <Card>
      <CardContent align="center">
          <Typography variant="h5" component="h2">
              SNO-JOE HLP
            </Typography>
        <Box mt={2}>
            <TokenSymbol symbol="SNO-JOE-LP" />
        </Box>
        <Box mt={2}>
            <span style={{ fontSize: '18px' }}>
                Multiplier: 10000x
            </span>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
          <Button color="primary" size='small' style={{ width: '200px', height: '40px', marginBottom: '10%' }} variant="contained" component={Link} to={`/farms/TombAvaxLPHShareRewardPool/`}>
            Stake
          </Button>
        </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={3}>
    <Card>
      <CardContent align="center">
          <Typography variant="h5" component="h2">
              JOE
            </Typography>
        <Box mt={2}>
            <TokenSymbol symbol="SNO-JOE-LP" />
        </Box>
        <Box mt={2}>
            <span style={{ fontSize: '18px' }}>
                Multiplier: 10000x
            </span>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
          <Button color="primary" size='small' style={{ width: '200px', height: '40px', marginBottom: '10%' }} variant="contained" component={Link} to={`/farms/TombAvaxLPHShareRewardPool/`}>
            Stake
          </Button>
        </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            wXDAI
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="SNOSHARE-JOE-LP" />
          </Box>
          <Box mt={2}>
            <span style={{ fontSize: '18px' }}>
                Multiplier: 10000x
            </span>
        </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '200px', height: '40px', marginBottom: '10%' }} variant="contained" component={Link} to={`/farms/HshareAvaxLPHShareRewardPool/`}>
              Stake
            </Button>
          </CardActions>
      </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            wETH
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="SNOSHARE-JOE-LP" />
          </Box>
          <Box mt={2}>
            <span style={{ fontSize: '18px' }}>
                Multiplier: 10000x
            </span>
        </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '200px', height: '40px', marginBottom: '10%' }} variant="contained" component={Link} to={`/farms/HshareAvaxLPHShareRewardPool/`}>
              Stake
            </Button>
          </CardActions>
      </Card>
      </Grid>
    </Grid>
  );
};

export default GenesisCard;
