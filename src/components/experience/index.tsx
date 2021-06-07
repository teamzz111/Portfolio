import React from 'react';
import {Container, Title} from './styles';
import {MdWork} from '@react-icons/all-files/md/MdWork';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {SubTitle} from '../profile/styles';
import {useTranslation} from 'react-i18next';

import '../../styles/fonts.css';

const Experience: React.FC = () => {
  const [t] = useTranslation();

  return (
    <Container>
      <Title style={{color: 'black'}}>{t('experience')}</Title>
      <VerticalTimeline className={'black'}>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2018 - present"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Freelance Software Developer
          </span>
          <br />

          <span className="vertical-timeline-element-subtitle">
            Freelance - Colombia
          </span>
          <p>
            FullStack develper avaliable for you since 2018 for freelance
            project! I worked with simple and complex landing pages, mobile apps
            using html, css, angular, unity, sass, wordpress.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="jan. 2019 - abr. 2019"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Software Developer
          </span>
          <br />

          <span className="vertical-timeline-element-subtitle">
            HTQA S.A.S - Bogotá D.C
          </span>
          <p>
            Developer in charge of coordinating activities with the entire team.
            Deepen in PHP with API Rest, React Native, MySQL, Html, Css,
            JavaScript
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="jan. 2019 - oct. 2020"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Head Of Engineering
          </span>
          <br />
          <span className="vertical-timeline-element-subtitle">
            nuTask - Denver, CO
          </span>
          <p>
            Engineer in charge of managing infrastructure cloud with AWS,
            developing with Node.js and React Native.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="may. 2019 - oct. 2019"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Freelance Developer
          </span>
          <br />

          <span className="vertical-timeline-element-subtitle">Colombia</span>
          <p>
            Web app developer for creating shops with Wordpress, Html, Css,
            JavaScript
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="ago. 2019 - jul. 2020"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Junior Consultant
          </span>
          <br />

          <span className="vertical-timeline-element-subtitle">
            DB Solution S.A.S - Bogotá D.C
          </span>
          <p>
            FullStack developer oriented to media and big scale, in charge of
            frontend and backend. I deepened in technologies such as React
            Native, Node.js, Express.js, Knex.js, Angular9, TypeScript,
            Framework7, Ionic, C# WebApis, Pupeteer, Serverless, AWS, GCloud,
            PHP, Laravel, React.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="ago. 2020 - nov. 2020"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Freelancer Developer
          </span>
          <span className="vertical-timeline-element-subtitle">Bogotá D.C</span>
          <p>
            Freelancer developer at companies such as ArepaTech, KidWordExplorer
            Garden and small customers who require the services, I've worked
            with C#, React, Gatsby, Wordpress, Html, Css, Contentful, Graphql.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="jul. 2020 - oct. 2020"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            Frontend Developer
          </span>
          <br />

          <span className="vertical-timeline-element-subtitle">
            Imaginamos - Bogotá D.C
          </span>
          <p>
            Frontend developer in charge of the development and implementation
            of new functionalities requested in a mobile application type
            product (React Native + Redux + Third integrations + Socket.io).
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="oct. 2020 - present"
          iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          icon={<MdWork />}>
          <span className="vertical-timeline-element-title">
            FullStack Developer - Cloud Engineer
          </span>
          <br />

          <span className="vertical-timeline-element-subtitle">
            Chamba LLC - Denver CO
          </span>
          <p>
            Engineer in charge of managing infrastructure cloud with AWS (ELB,
            ECS, ECR, EC2, Route53, S3, CloudWatch, Amplify, Pinpoint, API
            Gateway, Lambda, SES, SNS, Cognito, IAM), developing with Node.js,
            MongoDB, TypeScript, Docker, Firebase, React Native, Gatsby, React,
            Nest.js, Serverless, C# .Net core, Stripe, Styled components, Redux,
            Redux persist, Socket.io.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
          icon={<MdWork />}
        />
      </VerticalTimeline>
    </Container>
  );
};

export default Experience;
