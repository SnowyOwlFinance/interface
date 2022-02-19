import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/logo_hermes5.png';
import tShareLogo from '../../assets/img/logo_hshare3.png';
import tombLogoPNG from '../../assets/img/logo_hermes.png';
import tShareLogoPNG from '../../assets/img/logo_hshare.png';
import tBondLogo from '../../assets/img/logo_hbond2.png';

import tombFtmLpLogo from '../../assets/img/hermes_avax2.png';
import tshareFtmLpLogo from '../../assets/img/hshare_avax2.png';

import wftmLogo from '../../assets/img/avax.png';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  HERMES: tombLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  HSHARE: tShareLogo,
  HBOND: tBondLogo,
  WFTM: wftmLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  'SNO-JOE-LP': tombFtmLpLogo,
  'SNOSHARE-SNO-LP': tshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 90 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
