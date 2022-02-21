import { useCallback, useState, useEffect } from 'react';
import useTombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';
import { PoolStats } from '../tomb-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const tombFinance = useTombFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await tombFinance.getPoolAPRs(bank));
  }, [tombFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch SNOBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, tombFinance, fetchAPRsForPool]);

  if (!bank) return {
    yearlyAPR: 0,
    dailyAPR: 0,
    TVL: 0
  }

  return poolAPRs;
};

export default useStatsForPool;
