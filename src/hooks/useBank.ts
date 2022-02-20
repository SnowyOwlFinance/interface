import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);
  return banks.find((bank) => contractName.toLowerCase().startsWith(bank.depositTokenName.split("-")[0].toLowerCase()));
};

export default useBank;
