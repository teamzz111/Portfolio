
import styled from "styled-components";
import { MAIN_COLOR } from "../../styles/color";


export const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.3em;
  color: white;
  max-width: 1300px;
  padding: 1em 0em 0.5em 0em;
  margin: auto;
`;

export const WrapperHeader = styled.div`
  background-color: ${MAIN_COLOR};
  width: 100%;
`;

export const Title = styled.p`
  width: 60%;
  margin-left: 1em;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 40%;
`;

export const Item = styled.li`
  list-style-type: none;
`;

export const ItemRef = styled.a`
  text-decoration: none;
  color: white;
`;