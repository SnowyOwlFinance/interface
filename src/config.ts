// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@traderjoe-xyz/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.AVALANCHE,
    networkName: 'Avalanche C Chain',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      FUSDT: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', 6], // This is actually usdc on mainnet not fusdt
      BOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      ZOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 0],
      SHIBA: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 9],
      'WAVAX-USDC-LP': ['0xbd918ed441767fe7924e99f6a0e0b568ac1970d9', 18],
      'SNO-JOE-LP': ['0x5cFdAb5289E8a044b4305E19242F1966ceBeE953', 18],
      'SNOSHARE-SNO-LP': ['0xcA0bd32f9B1b91421672B4F428721FCb37f08a88', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.AVALANCHE,
    networkName: 'Avalanche C Chain',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      FUSDT: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', 6], // This is actually usdc on mainnet not fusdt
      BOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      ZOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 0],
      SHIBA: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 9],
      'WAVAX-USDC-LP': ['0xbd918ed441767fe7924e99f6a0e0b568ac1970d9', 18],
      'SNO-JOE-LP': ['0x5cFdAb5289E8a044b4305E19242F1966ceBeE953', 18],
      'SNOSHARE-SNO-LP': ['0xcA0bd32f9B1b91421672B4F428721FCb37f08a88', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  HermesAvaxLPHShareRewardPool: {
    name: 'Earn HSHARE by HERMES-AVAX LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'HermesAvaxLPHShareRewardPool',
    depositTokenName: 'SNO-JOE-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  HshareAvaxLPHShareRewardPool: {
    name: 'Earn HSHARE by HSHARE-AVAX LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'HshareAvaxLPHShareRewardPool',
    depositTokenName: 'SNOSHARE-SNO-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
