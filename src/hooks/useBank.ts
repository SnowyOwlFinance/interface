import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);
  if (contractName === "SnoShareJoeLPSnoShareRewardPool") {
    return banks[1]
  } else {
    return banks[0]
  }
};

export default useBank;
