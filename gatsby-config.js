module.exports = {
  siteMetadata: {
    title: 'Andrés Largo',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};
