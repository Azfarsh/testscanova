import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoginModal from '@/components/auth/LoginModal'; // Adjust the import path as needed

const Hero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleOpenSignup = () => {
    // Add signup modal logic here
    handleCloseLogin();
  };

  return (
    <>
      <div className="relative text-white overflow-hidden h-screen">
        {/* 🔵 Fullscreen Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/7579331-uhd_4096_2160_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🔵 Cyan Overlay */}
        <div className="absolute inset-0 bg-cyan-700 bg-opacity-40 z-10 pointer-events-none"></div>

        {/* 🔵 Content */}
        <div className="container mx-auto px-4 py-24 relative z-20 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Healthcare Reimagined with{" "}
                <span className="text-cyan-200">AI Technology</span>
              </h1>
              <p className="text-lg mb-8 text-cyan-100">
                Scanova provides cost-effective, efficient, and accessible medical screening and personalized healthcare solutions powered by artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div>
                  <Button 
                    className="bg-white text-cyan-700 px-6 py-6 rounded-lg shadow-lg font-medium transition duration-300 w-full sm:w-auto hover:bg-cyan-50"
                    onClick={handleOpenLogin}
                  >
                    Get Started
                  </Button>
                </div>

                <div>
                  <Link href="services">
                    <Button className="bg-white text-cyan-700 px-6 py-6 rounded-lg shadow-lg font-medium transition duration-300 w-full sm:w-auto hover:bg-cyan-50">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Optional Image Placeholder */}
              {/* <img src="/your-image.png" alt="Visual" className="rounded-lg shadow-xl max-w-full h-auto" /> */}
            </motion.div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal 
          onClose={handleCloseLogin}
          openSignup={handleOpenSignup}
        />
      )}
    </>
  );
};

export default Hero;
