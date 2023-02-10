import React from 'react';
import { Box, Container, Grid } from 'theme-ui';
import BlockTitle from 'pages/block-title';
import ServiceCard from 'components/cards/service-card';
import serviceImage1 from 'assets/service-1.png';
import serviceImage2 from 'assets/service-2.png';
import serviceImage3 from 'assets/service-3.png';
import serviceImage4 from 'assets/service-4.png';
import serviceImage5 from 'assets/service-5.png';
import serviceImage6 from 'assets/service-6.png';

const SERVICES_DATA = [
  {
    image: serviceImage1,
    text:
      'The most important thing here is security. We are not interested to sell your data.',
    heading: 'Security is our priority',

  },
  {
    image: serviceImage2,
    text:
      'Every data is encrypted. So, no one can see your data. ',
    heading: 'Encryption',

  },
  {
    image: serviceImage3,
    text:
      'Its tested and well designed. So, you can use it without any problem.',
    heading: 'Well Designed ',

  },
  {
    image: serviceImage4,
    text:
      'We are not interested to marketing and selling. Security is the priority for us.',
    heading: 'Marketing & advertising',

  },
  {
    image: serviceImage5,
    text:
      'Yes, There will not a problem if you put tons of data here, but you have to be a member',
    heading: 'Usage',

  },
  {
    image: serviceImage6,
    text:
      'We are always online. You can contact us anytime.',
    heading: 'Online',

  },
];
const Services = () => {
  return (
    <Box as="section" id="services" sx={styles.services}>
      <Container>
        <BlockTitle
          title="What is our purpose"
          text="Features are highlighted what we are doing"
        />
        <Grid sx={styles.grid}>
          {SERVICES_DATA.map(({ image, text, heading }, index) => (
            <ServiceCard
              image={image}
              text={text}
              heading={heading}
              key={index}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;

const styles = {
  services: {
    pt: ['80px', null, null, null, '80px', null, '100px'],
  },
  grid: {
    gridGap: '30px',
    gridTemplateColumns: ['1fr', null, null, '1fr 1fr', null, '1fr 1fr 1fr'],
  },
};
