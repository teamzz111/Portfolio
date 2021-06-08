import styled from 'styled-components';
import {CONTRAST_COLOR, MAIN_COLOR} from '../../styles/color';
import {StaticImage} from 'gatsby-plugin-image';
import {device} from '../../utils';

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${MAIN_COLOR};
  justify-content: space-around;
`;

export const LeftContainer = styled.div`
  margin-top: 1em;
  width: 100%;
  max-width: 600px;
  color: white;
  padding: 1em;
`;

export const RightContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding-bottom: 20px;
  text-align: center;
  @media ${device.mobileL} {
    display: none;
  }
`;

export const Background = styled.div`
  background-color: ${MAIN_COLOR};
`;

export const SubTitle = styled.p`
  color: ${CONTRAST_COLOR};
  font-size: 1.4em;
`;

export const Title = styled.h1`
  font-size: 4em;
  margin: 0 !important;
`;

export const Job = styled.p`
  margin-bottom: 1em;
  font-weight: 300;
  opacity: 0.8;
  font-size: 1.2em;
`;

export const ContainerResume = styled.div`
  margin-top: 2em;
`;
export const Resume = styled.small`
  font-size: 1em;
  line-height: 23px;
`;

export const Button = styled.button`
  padding: 1em;
  background-color: ${CONTRAST_COLOR};
  border-color: transparent;
  margin-top: 2em;
  border: 1px solid black;
  font-size: 1em;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    opacity: 0.67;
    transition: 1s;
  }
  @media ${device.mobileL} {
    align-self: center;
  }
`;

export const SeeMore = styled.p`
  margin: 0 !important;
`;

export const ImageStatic = styled(StaticImage)`
  width: 100%;
  max-width: 200px;
`;
