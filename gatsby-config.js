module.exports = {
  siteMetadata: {
    title: 'Andrés Largo',
    description: 'I am a Systems engineering student focused on high level software development. I like to work on projects that have to do with mobile development, like Android apps and Web apps. The depth or difficulty is not a problem to me, I can solve it and make an amazing work for you. If you need to use some special language, I can make it happen.    ',
    author: '@teamzz111',
    siteUrl: `https://www.andreslargo.com`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`300`, `400`, `700`]
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/utils/locales`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale', // name given to `gatsby-source-filesystem` plugin.
        languages: ['en', 'es'],
        redirect: true,
        siteUrl: 'https://andreslargo.com/',
        i18nextOptions: {
          ns: ['home', 'translation'],
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [],
      },
    },
  ],
};
