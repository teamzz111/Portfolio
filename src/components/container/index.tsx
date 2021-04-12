import React from 'react';
import {MainContainer} from './styles';

interface IContainer {
  children: React.ReactNode;
}

const Container: React.FC<IContainer> = ({children}) => (
  <MainContainer>{children}</MainContainer>
);

export default Container;
