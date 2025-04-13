import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';

const CallToAction = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleOpenSignup = () => {
    // Add signup modal logic here
    handleCloseLogin();
  };

  return (
    <div className="bg-gradient-to-r from-cyan-700 to-cyan-900 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Experience the Future of Healthcare?
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join thousands of users who are already benefiting from Scanova's AI-powered healthcare solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="bg-white text-cyan-700 hover:bg-cyan-50 px-8 py-6 rounded-lg shadow-lg font-medium text-lg transition duration-300"
            onClick={handleOpenLogin}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>

      {showLoginModal && (
        <LoginModal 
          onClose={handleCloseLogin}
          openSignup={handleOpenSignup}
        />
      )}
    </div>
  );
};

export default CallToAction;
