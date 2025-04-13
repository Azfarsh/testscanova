import { Helmet } from 'react-helmet';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Benefits from '../components/home/Benefits';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Scanova - Smart Healthcare Platform</title>
        <meta name="description" content="Scanova provides cost-effective, efficient, and accessible medical screening and personalized healthcare solutions powered by artificial intelligence." />
      </Helmet>
      
      <Hero />
      <Services />
      <Benefits />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;
