import React from "react";
import { HeaderBar, List, Title, WrapperHeader, Item, ItemRef } from "./styles";

const Header: React.FC = () => {
  return (
    <WrapperHeader>
      <HeaderBar>
        <Title>Portfolio</Title>
        <List>
          <Item>
            <ItemRef href="#">About</ItemRef>
          </Item>
          <Item>
            <ItemRef href="#">Experience</ItemRef>
          </Item>
          <Item>
            <ItemRef href="#">Skills</ItemRef>
          </Item>
        </List>
      </HeaderBar>
    </WrapperHeader>
  );
};

export default Header;
