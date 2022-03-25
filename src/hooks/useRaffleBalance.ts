import {useEffect, useState} from 'react';
import useTombFinance from './useTombFinance';
import {TokenStat} from '../tomb-finance/types';
import useRefresh from './useRefresh';
import useWallet from 'use-wallet';
const useRaffleStats = (account: string, raffleAddress: string) => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const foxFinance = useTombFinance();
  
  useEffect(() => {
    async function fetchGrapePrice() {
      
      try {
        setStat(await foxFinance.getRaffleStat(account, raffleAddress));
      } catch (err) {
        console.error(err);
      }
    }
    fetchGrapePrice();
  }, [setStat, foxFinance, fastRefresh]);

  return stat;
};

export default useRaffleStats;
