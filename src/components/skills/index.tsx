import React from 'react';
import {
  BottomContainer,
  Contain,
  ContainerMiddle,
  Percent,
  PercentContainer,
  ProgressBar,
  SkillsContainer,
  TextPercent,
  TextTitle,
  Title,
  TitleItem,
  TitlePercent,
  TopText,
} from './styles';
import {data, data2, data3, data4} from '../../utils/index';
import '../../styles/fonts.css';
import {useTranslation} from 'react-i18next';

const Skills = () => {
  const {t} = useTranslation();
  return (
    <div style={{zIndex: 4, justifyContent: 'center'}}>
      <Title>Skills</Title>
      <SkillsContainer>
        <Contain className="contenido">
          <TopText className="top">
            <TextTitle>{t('skillsDescription')}</TextTitle>
          </TopText>
          <BottomContainer>
            <ContainerMiddle
              className="der"
              data-sal="slide-up"
              data-sal-delay="100">
              <PercentContainer id="dynamic" className="porcentajes">
                <TitleItem>{t('mobile')}</TitleItem>
                {data.map((value, key) => (
                  <div key={key}>
                    <Percent>
                      <TitlePercent>
                        <TextPercent>{value.text}</TextPercent>
                      </TitlePercent>
                      <TitlePercent className="percent">
                        {value.percent}
                      </TitlePercent>
                    </Percent>
                    <ProgressBar
                      className="progress-bar"
                      style={{width: value.percent}}>
                      <div className="shadow"></div>
                    </ProgressBar>
                  </div>
                ))}
              </PercentContainer>
            </ContainerMiddle>
            <br />
            <ContainerMiddle
              className="der"
              data-sal="slide-up"
              data-sal-delay="100">
              <PercentContainer id="dynamic" className="porcentajes">
                <TitleItem>{t('mobile')}</TitleItem>
                {data2.map((value, key) => (
                  <div key={key}>
                    <Percent>
                      <TitlePercent>
                        <TextPercent>{value.text}</TextPercent>
                      </TitlePercent>
                      <TitlePercent className="percent">
                        {value.percent}
                      </TitlePercent>
                    </Percent>
                    <ProgressBar
                      className="progress-bar"
                      style={{width: value.percent}}>
                      <div className="shadow"></div>
                    </ProgressBar>
                  </div>
                ))}
              </PercentContainer>
            </ContainerMiddle>
            <br />

            <ContainerMiddle
              className="der"
              data-sal="slide-up"
              data-sal-delay="100">
              <PercentContainer id="dynamic" className="porcentajes">
                <TitleItem>{t('bd')}</TitleItem>
                {data3.map((value, key) => (
                  <div key={key}>
                    <Percent>
                      <TitlePercent>
                        <TextPercent>{value.text}</TextPercent>
                      </TitlePercent>
                      <TitlePercent className="percent">
                        {value.percent}
                      </TitlePercent>
                    </Percent>
                    <ProgressBar
                      className="progress-bar"
                      style={{width: value.percent}}>
                      <div className="shadow"></div>
                    </ProgressBar>
                  </div>
                ))}
              </PercentContainer>
            </ContainerMiddle>
            <ContainerMiddle
              className="der"
              data-sal="slide-up"
              data-sal-delay="100">
              <PercentContainer id="dynamic" className="porcentajes">
                <TitleItem>{t('dev')}</TitleItem>
                {data4.map((value, key) => (
                  <div key={key}>
                    <Percent>
                      <TitlePercent>
                        <TextPercent>{value.text}</TextPercent>
                      </TitlePercent>
                      <TitlePercent className="percent">
                        {value.percent}
                      </TitlePercent>
                    </Percent>
                    <ProgressBar
                      className="progress-bar"
                      style={{width: value.percent}}>
                      <div className="shadow"></div>
                    </ProgressBar>
                  </div>
                ))}
              </PercentContainer>
            </ContainerMiddle>
          </BottomContainer>
        </Contain>
      </SkillsContainer>
    </div>
  );
};

export default Skills;
