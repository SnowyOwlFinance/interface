import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo_trans.png'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background: rgb(106,106,106);
  background: linear-gradient(90deg, rgba(106,106,106,1) 14%, rgba(177,177,177,1) 100%);
  background-position: bottom right;
  border-radius: 15px;
  color: #FFFFFF;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;
