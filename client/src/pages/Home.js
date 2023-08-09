import React from 'react';

import OffCanvas from '../components/OffCanvas';

import { Container, Row, Col, Stack, Carousel, Image, Figure, Anchor } from 'react-bootstrap';
import telephone from '../customIcons/telephone.gif';
import people from '../customIcons/people.png';
import paranoid from '../customIcons/paranoid.png';
import basement from '../customIcons/basement.png';


// import { useQuery } from '@apollo/client';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

const GhostBustersAd = () => {
  return (
    <div className='video-responsive'>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/sRee26pfVzU"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    </div>
  );
};

const Home = () => {
//   const { loading, data } = useQuery(QUERY_THOUGHTS);
//   const thoughts = data?.thoughts || [];

  return (

    <Container className='ad'>
      <Row>
        <Carousel className='text-center p-4' indicators={false} controls={false}>
          <Carousel.Item>
            <p>Are you troubled by strange noises in the middle of the night?</p>
            <a href='https://www.flaticon.com/free-icons/unease' target='_blank' rel='noreferrer'>
            <Figure.Image
              width={100}
              height={100}
              src={paranoid}
              alt='unease icons'
              title='Unease icons created by Leremy - Flaticon' 
              />
              </a>
          </Carousel.Item>
          <Carousel.Item>
            <p>Do you experience feelings of dread in your basement or attic?</p>
            <a href='https://www.flaticon.com/free-icons/peeping' target='_blank' rel='noreferrer'>
            <Figure.Image
              width={100}
              height={100}
              src={basement}
              alt='peeping icons'
              title='Peeping icons created by Leremy - Flatico' 
              />
              </a>
          </Carousel.Item>
          <Carousel.Item>
            <p>Have you or any of your family ever seen a spook, specter, or ghost?</p>
            <a href='https://www.flaticon.com/free-icons/haunt' target='_blank' rel='noreferrer'>
            <Figure.Image
              width={100}
              height={100}
              src={people}
              alt='haunt icons'
              title="Haunt icons created by Leremy - Flaticon" 
              />
              </a>
          </Carousel.Item>
          <Carousel.Item >
            <p>If the answer is yes then don’t wait another minute. Pick up your phone and call the professionals.</p>
            <a href="https://www.flaticon.com/free-animated-icons/phone" target='_blank' rel='noreferrer'>
            <Figure.Image
              width={100}
              height={100}
              src={telephone}
              alt='phone animated icons'
              title='Phone animated icons created by Freepik - Flaticon' 
              />
              </a>
          </Carousel.Item>

        </Carousel>
        <Col className='text-center'>
          <GhostBustersAd />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
