import styled from 'styled-components';

export const SkillsContainer = styled.div``;

export const Contain = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1%;
`;

export const TopText = styled.div`
  padding: 2%;
  width: 100%;
  text-align: center;
`;

export const Title = styled.p`
  margin-top: 1.54em;
  margin-bottom: -1em;
  font-weight: 300;
  font-size: 3em;
  text-align: center;
  width: 100%;
  font-weight: 400;
`;

export const TextTitle = styled.p`
  text-align: justify;
  margin-bottom: 1.54em;
  max-width: 800px;
  margin: auto;
  padding: 4%;
`;

export const BottomContainer = styled.div`
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  width: 100%;
`;

export const ContainerMiddle = styled.div`
  width: 47%;
  padding: 1.5%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

export const PercentContainer = styled.div`
  width: 100%;
`;

export const ProgressBar = styled.div`
  height: 10px;
  background: linear-gradient(
    to right,
    rgb(76, 217, 105),
    rgb(90, 200, 250),
    rgb(0, 132, 255),
    rgb(52, 170, 220),
    rgb(88, 86, 217),
    rgb(255, 45, 83)
  );
  margin-top: 10px;
  background-size: 100% 5px;
  border-radius: 10px;
`;

export const Percent = styled.div`
  display: flex;
  margin-top: 2em;
  .percent {
    text-align: right;
  }
`;

export const TitlePercent = styled.div`
  width: 50%;
  color: rgba(66, 65, 65, 1);
`;

export const TextPercent = styled.span`
  font-weight: 500;
  font-familiy: Open Sans;
`;

export const TitleItem = styled.span`
  font-size: 1.3em;
`;
