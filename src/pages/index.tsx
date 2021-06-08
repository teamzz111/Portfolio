import * as React from 'react';

import {graphql} from 'gatsby';
import {useTranslation} from 'gatsby-plugin-react-i18next';

import SEO from '../components/seo';
import Header from '../components/header';
import Presentation from '../components/presentation';
import About from '../components/about';

import 'normalize.css';
import '../styles/fonts.css';
import Profile from '../components/profile';
import Experience from '../components/experience';
import Skills from '../components/skills';

const IndexPage: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      <SEO title={t('title')} />
      <Header />
      <Presentation />
      <About />
      <Profile />
      <Experience />
      <Skills />
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
