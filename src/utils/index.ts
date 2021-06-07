const data = [
  {
    id: 11,
    text: 'React Navigation',
    percent: '99%',
  },
  {
    id: 1,
    text: 'React Native',
    percent: '90%',
  },
  {
    id: 'cpp',
    text: 'C++',
    percent: '20%',
  },
  {
    id: 4,
    text: 'C#',
    percent: '60%',
  },
  {
    id: 5,
    text: 'Java Spring',
    percent: '40%',
  },
  {
    id: 6,
    text: 'Android Studio',
    percent: '35%',
  },
  {
    id: 7,
    text: 'ElectronJS',
    percent: '30%',
  },
  {
    id: 8,
    text: 'Redux',
    percent: '60%',
  },
  {
    id: 9,
    text: 'Ionic 3',
    percent: '40%',
  },
  {
    id: 10,
    text: 'Unity',
    percent: '30%',
  },
];
const data2 = [
  {
    id: 11,
    text: 'HTML - CSS - JS',
    percent: '80%',
  },
  {
    id: 'cssa',
    text: 'Gatsby',
    percent: '70%',
  },
  {
    id: 'sass',
    text: 'SASS - Styled Components',
    percent: '70%',
  },

  {
    id: 'js',
    text: 'JavaScript',
    percent: '80%',
  },
  {
    id: 'angu',
    text: 'Angular',
    percent: '60%',
  },
  {
    id: 'php',
    text: 'PHP / Yii / Laravel',
    percent: '30%',
  },
  {
    id: 'ror',
    text: '.NET Core 5',
    percent: '40%',
  },
  {
    id: 'node',
    text: 'NodeJS',
    percent: '70%',
  },
  {
    id: 'express',
    text: 'Express / Nest.js',
    percent: '50%',
  },
  {
    id: 'react',
    text: 'React',
    percent: '80%',
  },
];

const data3 = [
  {
    id: 3,
    text: 'MySQL',
    percent: '65%',
  },
  {
    id: 'postg',
    text: 'PostgreSQL',
    percent: '45%',
  },
  {
    id: 'MariaDB',
    text: 'MariaDB',
    percent: '65%',
  },
  {
    id: 'sqlserver',
    text: 'SQL Server',
    percent: '55%',
  },
  {
    id: 'Mongo',
    text: 'MongoDB',
    percent: '65%',
  },
  {
    id: 'firestore',
    text: 'Firestore',
    percent: '55%',
  },
  {
    id: 'azure',
    text: 'Azure',
    percent: '15%',
  },
];

const data4 = [
  {
    id: 'docker',
    text: 'Docker',
    percent: '40%',
  },
  {
    id: 'aws',
    text: 'AWS',
    percent: '60%',
  },
  {
    id: 'CircleCI',
    text: 'CircleCI',
    percent: '10%',
  },
  {
    id: 'git',
    text: 'GitHub',
    percent: '90%',
  },
  {
    id: 'Git',
    text: 'Git',
    percent: '90%',
  },
  {
    id: 'GitLab',
    text: 'GitLab',
    percent: '30%',
  },
  {
    id: 'bit',
    text: 'Bitbucket',
    percent: '40%',
  },
  {
    id: 'ibm',
    text: 'Serverless',
    percent: '80%',
  },
];

data.sort((a, b) => (a.percent < b.percent ? 1 : -1));
data2.sort((a, b) => (a.percent < b.percent ? 1 : -1));
data3.sort((a, b) => (a.percent < b.percent ? 1 : -1));
data4.sort((a, b) => (a.percent < b.percent ? 1 : -1));

export {data, data3, data2, data4};
