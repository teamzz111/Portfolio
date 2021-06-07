import React from 'react';
import Container from '../container';
import {StaticImage} from 'gatsby-plugin-image';
import {useTranslation} from 'gatsby-plugin-react-i18next';

import {
  Background,
  Button,
  ContainerResume,
  FlexContainer,
  Job,
  LeftContainer,
  Resume,
  RightContainer,
  SeeMore,
  SubTitle,
  Title,
} from './styles';

const Presentation: React.FC = () => {
  const { t } = useTranslation();
  
  const onClick = () => {
    window.open('https://www.linkedin.com/in/andreslargo/', '_blank');
  }

  return (
    <Background>
      <Container>
        <FlexContainer>
          <LeftContainer>
            <SubTitle>{t('subTitle')}</SubTitle>
            <Title>Andrés Largo</Title>
            <Job>{t('job')}</Job>
            <ContainerResume>
              <Resume>{t('resume')}</Resume>
            </ContainerResume>
            <br />
            <Button onClick={onClick}>
              <SeeMore>
                {t('seeMore')}
              </SeeMore>
            </Button>
          </LeftContainer>
          <RightContainer>
            <StaticImage
              src="../../images/hand.png"
              alt="A hand"
              placeholder="dominantColor"
              layout="fullWidth"
            />
          </RightContainer>
        </FlexContainer>
      </Container>
      <StaticImage
        src="../../images/1curva.svg"
        alt="Curva"
        placeholder="dominantColor"
        layout="fullWidth"
      />
    </Background>
  );
};

export default Presentation;
