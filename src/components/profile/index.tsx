import {StaticImage} from 'gatsby-plugin-image';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Container from '../container';
import {
  CenterContainer,
  CenterTitle,
  ContainerFlex,
  ElementItem,
  LeftContainer,
  Link,
  LinkContainer,
  RightContainer,
  Section,
  Span,
  SubTitle,
  Title,
  UlList,
} from './styles';

const Profile: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Section id="me" data-sal="fade">
      <div className="c2">
        <StaticImage
          src="../../images/curva2.svg"
          alt=""
          placeholder="dominantColor"
          layout="fullWidth"
        />
      </div>
      <Container>
        <Title>{t('profile')}</Title>
        <ContainerFlex className="father" data-aos="flip-up">
          <LeftContainer className="izq">
            <StaticImage
              src="../../images/code.png"
              alt=""
              placeholder="dominantColor"
              width={120}
              height={120}
            />
            <UlList>
              <ElementItem>
                <Link href="https://github.com/teamzz111">
                  <LinkContainer className="link">
                    <Span className="span">
                      <span>GitHub</span>
                    </Span>
                  </LinkContainer>
                </Link>
              </ElementItem>
              <ElementItem>
                <Link href="https://github.com/teamzz111">
                  <LinkContainer className="link">
                    <Span className="span">
                      <span>GitLab</span>
                    </Span>
                  </LinkContainer>
                </Link>
              </ElementItem>
              <ElementItem>
                <Link href="https://gitlab.com/teamzz111">
                  <LinkContainer className="link">
                    <Span className="span">
                      <span>Curriculum vitae</span>
                    </Span>
                  </LinkContainer>
                </Link>
              </ElementItem>
            </UlList>
          </LeftContainer>
          <CenterContainer className="cen">
            <StaticImage
              src="../../images/me.png"
              alt=""
              placeholder="dominantColor"
              style={{maxWidth: 170}}
              imgStyle={{borderRadius: 100}}
            />
            <CenterTitle>{t('ing')}</CenterTitle>
            <SubTitle>{t('job')}</SubTitle>
            <SubTitle>Bogotá D.C, Colombia</SubTitle>
          </CenterContainer>
          <RightContainer className="der">
            <StaticImage
              src="../../images/contact.png"
              alt=""
              placeholder="dominantColor"
              style={{maxWidth: 120}}
            />
            <UlList>
              <ElementItem>
                <Link href="mailto:contact@andreslargo.com">
                  <LinkContainer className="link">
                    <Span className="span">
                      <span>Email</span>
                    </Span>
                  </LinkContainer>
                </Link>
              </ElementItem>
              <ElementItem>
                <Link href="https://www.facebook.com/felipe.largo.5243">
                  <LinkContainer className="link">
                    <Span className="span">
                      <span>Facebook</span>
                    </Span>
                  </LinkContainer>
                </Link>
              </ElementItem>
              <ElementItem>
                <Link href="https://plus.google.com/u/0/110803730941288424609">
                  <LinkContainer className="link">
                    <Span className="span">
                      <span>Google+</span>
                    </Span>
                  </LinkContainer>
                </Link>
              </ElementItem>
            </UlList>
          </RightContainer>
        </ContainerFlex>
      </Container>
    </Section>
  );
};

export default Profile;
