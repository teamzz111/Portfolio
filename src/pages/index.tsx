import * as React from 'react';

import {graphql} from 'gatsby';
import {useTranslation} from 'gatsby-plugin-react-i18next';

import SEO from '../components/seo';
import Header from '../components/header';
import Presentation from '../components/presentation';

import 'normalize.css';
import '../styles/fonts.css';

const IndexPage: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      <SEO title={t('title')} />
      <Header />
      <Presentation />
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
