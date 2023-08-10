import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Stack, Carousel, Image, Figure, Anchor } from 'react-bootstrap';
import telephone from '../customIcons/telephone.gif';
import people from '../customIcons/people.png';
import paranoid from '../customIcons/paranoid.png';
import basement from '../customIcons/basement.png';
import bustinSong from '../audioElement/Ghostbusters.mp3';

import bustin from '../customIcons/bustin.png';

const GhostBustersAd = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1280);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1280);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const gbVideoURL = 'https://www.youtube.com/watch?v=sRee26pfVzU';

  return (
    <div>
    {isSmallScreen ? (
      <div className="alternate-video">
       <a href={gbVideoURL} target="_blank" rel="noopener noreferrer">
       <img src={bustin} alt="Logo" className='vid-logo'/>
       </a> 
      </div>
    ) : (
    <div className='video-responsive'>
      <iframe
        width="1200"
        height="720"
        src="https://www.youtube.com/embed/sRee26pfVzU"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    </div>
    )}
    </div>
  );
};

function AudioComponent() {
  return (
    <audio controls autoPlay>
      <source src={bustinSong} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}

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
              width={150}
              height={150}
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
              width={150}
              height={150}
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
              width={150}
              height={150}
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
          <AudioComponent /> {AudioComponent}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
