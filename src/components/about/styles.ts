import styled from 'styled-components';
import {StaticImage} from 'gatsby-plugin-image';

export const SectionAbout = styled.section`
  background-color: #fafafa;
  padding-bottom: 5em;
`;

export const Title = styled.h2`
  font-size: 3.7em;
  margin: 0;
  padding-top: 1em;
  text-align: center;
`;

export const SubTitle = styled.h4`
  margin-top: 2em;
  text-align: center;
  font-weight: 300;
  font-family: Open Sans;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4em;
  padding: 0;
  padding-bottom: 1em;
`;

export const Card = styled.div`
  transition: 0.1s linear;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  h4 {
    margin-top: 0.1em;
    text-decoration: none;
  }
  border-radius: 10px;
  width: 100%;
  max-width: 240px;
  background: #ffffff;
  box-shadow: -2px 0px 26px -4px rgba(0, 0, 0, 0.75);
  padding: 1em;
  margin: 0.5em;
`;

export const TitleCard = styled.a`
  text-align: center;
  color: black;
  &:selected {
    color: black;
  }
  font-size: 1.3em;
  p {
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
  }
`;
