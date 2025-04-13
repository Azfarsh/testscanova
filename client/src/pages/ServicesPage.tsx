import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import ServiceCard from '../components/services/ServiceCard';
import HowItWorks from '../components/services/HowItWorks';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', 'voice analysis', 'image screening', 'health monitoring', 'medical records'];
  
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category.toLowerCase() === activeCategory);
  
  const categoryVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };
  
  const servicesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const accuracyVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Smart Screening Services | Scanova</title>
      </Helmet>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Smart Screening Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Leverage our AI-driven diagnostic tools for early disease detection and personalized health insights.</p>
          </motion.div>
          
          {/* Service Categories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full ${
                  activeCategory === category 
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </motion.div>
          
          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              variants={servicesVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredServices.map((service) => (
                <motion.div key={service.id} variants={itemVariants}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12 bg-white rounded-lg shadow-md mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl text-gray-300 mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Services Found</h2>
              <p className="text-gray-500">Try selecting a different category.</p>
            </motion.div>
          )}
          
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Accuracy & Trust */}
          <motion.div 
            className="bg-gradient-to-r from-cyan-700 to-cyan-900 text-white rounded-lg shadow-md p-8"
            variants={accuracyVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-4">Accuracy You Can Trust</h2>
                <p className="mb-6">Our AI models are trained on extensive medical datasets and validated by healthcare professionals. The technology achieves diagnostic accuracy comparable to specialized medical practitioners in many cases.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">97%</div>
                    <div className="text-sm">Average accuracy for voice analysis</div>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">94%</div>
                    <div className="text-sm">Average accuracy for image screening</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Medical AI technology" 
                  className="rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
