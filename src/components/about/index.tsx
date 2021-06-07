import {StaticImage} from 'gatsby-plugin-image';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Container from '../container';
import {
  Card,
  CardContainer,
  SectionAbout,
  SubTitle,
  Title,
  TitleCard,
} from './styles';

const About: React.FC = () => {
  const [t] = useTranslation();
  return (
    <SectionAbout>
      <Container>
        <Title>{t('aboutMe')}</Title>
        <SubTitle>{t('descr')}</SubTitle>
        <CardContainer>
          <Card
            data-sal="flip-left"
            data-sal-easing="ease-out-cubic"
            data-sal-delay="2000">
            <TitleCard href="#me">
              <p> {t('profile')}</p>
              <StaticImage
                src="../../images/undraw_dev_productivity_umsq.svg"
                alt=""
                placeholder="dominantColor"
                layout="fullWidth"
              />
            </TitleCard>
          </Card>
          <Card data-aos="flip-right">
            <TitleCard href="#timeline">
              <p>{t('timeline')}</p>
              <StaticImage
                src="../../images/undraw_personal_goals_edgd.svg"
                alt=""
                placeholder="dominantColor"
                layout="fullWidth"
              />
            </TitleCard>
          </Card>
          <Card data-aos="flip-left">
            <TitleCard href="#der">
              <p>Skills</p>
              <StaticImage
                src="../../images/undraw_up_to_date_rmbm.svg"
                alt=""
                placeholder="dominantColor"
                layout="fullWidth"
              />
            </TitleCard>
          </Card>
          {/* <Card data-aos="flip-left">
            <TitleCard href="#der">
              <h4>Productive</h4>
              <StaticImage
                src="../../images/undraw_dev_productivity_umsq.svg"
                alt=""
                placeholder="dominantColor"
                layout="fullWidth"
              />
            </TitleCard>
          </Card> */}
        </CardContainer>
      </Container>
    </SectionAbout>
  );
};

export default About;
