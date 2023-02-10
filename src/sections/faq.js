import React from 'react';
import { Box, Container, Flex, Text, Heading } from 'theme-ui';
import { Link } from 'components/link';
import BlockTitle from 'pages/block-title';
import Accordion from 'components/accordion/accordion';

const accordionData = [
  {
    isExpanded: false,
    title: 'Is Rokka Paid?',
    contents: (
      <div>
       Actually, Rokka is paid but it is free for the special members. Any member can join Rekka by contacting with the support team.
      </div>
    ),
  },
  {
    isExpanded: true,
    title: 'Can anyone join Rokka?',
    contents: (
      <div>
      Yes, You are welcome. 
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'Is Rokka a scam?',
    contents: (
      <div>
        Of course not. Data securing is the purpose. It's better not to think rokka a scam.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'Does Rokka need any payment ?',
    contents: (
      <div>
        Yes, Rokka needs some payment. But it is free for the special members. Any member can join Rokka by contacting with the support team.
      </div>
    ),
  },
  
  {
    isExpanded: false,
    title: 'What is rokka ?',
    contents: (
      <div>
        Rokka is a data securing platform. It is a platform where you can store your data safely.
        Moreover, you can share you password or important data with your friends or family members.
        which is quite risky sharing on messenger or whatsapp.
      </div>
    ),
  },
 
];

const FAQ = () => {
  return (
    <Box as="section">
      <Container>
        <BlockTitle
          title="Frequently Ask Question"
          text="Ask your question and meet"
        />
        <Flex sx={styles.flex}>
          <Box sx={styles.faqWrapper}>
            <Accordion items={accordionData} />
          </Box>
          <Box sx={styles.content}>
            <Heading as="h3">
              Do you have any quesiton? Please ask here we ready to answer
            </Heading>
            <Text as="p">
              If your question is not list here, please feel free to make a
              question via email. 
              email us - farhanibne760@gmail.com
            </Text> <br/>
            <a target={"_blank"} href={"mailto: info.shinpi@gmail.com"} style={{textDecoration:'none',color:'azure',padding:'15px',backgroundColor:'#02073E',borderRadius:'5px'}} >
              Ask your Question
            </a>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default FAQ;

const styles = {
  flex: {
    flexWrap: 'wrap',
    flexDirection: ['column', null, null, null, null, 'row-reverse'],
    pb: ['70px', null, null, null, '90px', null, '130px'],
  },
  content: {
    flex: ['0 0 100%', null, null, null, '0 0 33.333%'],
    maxWidth: ['100%', null, null, '450px', '100%'],
    mx: ['auto', null, null, null, '0'],
    mb: ['0px', null, null, null, '0'],
    textAlign: ['center', null, null, null, null, 'left'],
    mt: ['40px', null, null, null, null, '0'],
    h3: {
      fontSize: ['23px', null, null, null, '24px'],
      lineHeight: [1.5, null, null, null, 1.67],
      color: 'black',
      fontWeight: 700,
      letterSpacing: '-1.5px',
      mt: '-5px',
      pr: ['0', null, null, null, null, '30px'],
    },
    p: {
      fontSize: '16px',
      lineHeight: 1.87,
      color: '#343D48',
      opacity: 0.7,
      mt: '10px',
      pr: ['0', null, null, null, null, '80px'],
    },
  },
  askButton: {
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#02073E',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 700,
    p: '6.5px 19px',
    letterSpacing: '-0.16px',
    mt: '25px',
    transition: 'all 500ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  faqWrapper: {
    flex: ['0 0 100%', null, null, null, '0 0 66.666%'],
  },
};
