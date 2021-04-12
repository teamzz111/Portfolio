module.exports = {
  siteMetadata: {
    title: 'Andrés Largo',
    description: 'I am a Systems engineering student focused on high level software development. I like to work on projects that have to do with mobile development, like Android apps and Web apps. The depth or difficulty is not a problem to me, I can solve it and make an amazing work for you. If you need to use some special language, I can make it happen.    ',
    author: 'teamzz111',
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
