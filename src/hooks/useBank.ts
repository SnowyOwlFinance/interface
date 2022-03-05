import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);
  if (contractName === "SnoShareJoeLPSnoShareRewardPool") {
    return banks.find(bank => bank.sectionInUI === 2 && bank.depositTokenName === "SNOSHARE-JOE-LP")
  } else if (contractName === "SnoJoeLPSnoShareRewardPool") {
    return banks.find(bank => bank.sectionInUI === 2 && bank.depositTokenName === "SNO-JOE-LP")
  } else if (contractName === "SnoSnoShareLPSnoShareRewardPool") {
    return banks.find(bank => bank.sectionInUI === 2 && bank.depositTokenName === "SNO-SNOSHARE-LP")
  } else if (contractName === "SnoSnoShareRewardPool") {
    return banks.find(bank => bank.sectionInUI === 2 && bank.depositTokenName === "SNO")
  } else {
    return null
  }
};

export default useBank;
