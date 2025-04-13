import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import Navbar from './Navbar';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import { AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setSignupModalOpen(true);
    setMobileMenuOpen(false);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  // ✅ Close modals & redirect on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (loginModalOpen) closeLoginModal();
        if (signupModalOpen) closeSignupModal();
        setLocation('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [loginModalOpen, signupModalOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        toggleMobileMenu={toggleMobileMenu} 
        openLoginModal={openLoginModal} 
        openSignupModal={openSignupModal} 
      />
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu 
            closeMenu={() => setMobileMenuOpen(false)} 
            openLoginModal={openLoginModal} 
            openSignupModal={openSignupModal} 
          />
        )}
      </AnimatePresence>

      <main className="flex-grow">{children}</main>
      <Footer />

      <AnimatePresence>
        {loginModalOpen && (
          <LoginModal 
            onClose={closeLoginModal} 
            openSignup={() => {
              closeLoginModal();
              openSignupModal();
            }} 
          />
        )}
        {signupModalOpen && (
          <SignupModal 
            onClose={closeSignupModal} 
            openLogin={() => {
              closeSignupModal();
              openLoginModal();
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
