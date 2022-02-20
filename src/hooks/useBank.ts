import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);
  console.log(banks)
  if (contractName === "SnoShareJoeLPSnoShareRewardPool") {
    return banks[banks.length - 1]
  } else {
    return banks[banks.length - 2]
  }
};

export default useBank;
