import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useauth';

interface MobileMenuProps {
  closeMenu: () => void;
  openLoginModal: () => void;
  openSignupModal: () => void;
}

const MobileMenu = ({ closeMenu, openLoginModal, openSignupModal }: MobileMenuProps) => {
  const { user, logout } = useAuth();

  const containerVariants = {
    hidden: { 
      opacity: 0,
      height: 0 
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <motion.div 
      className="md:hidden bg-white px-4 py-2 shadow-inner border-t border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col space-y-3 py-3">
        <motion.div variants={itemVariants}>
          <Link href="/" className="block text-gray-700 hover:text-cyan-600 transition duration-200 py-2" onClick={handleLinkClick}>
            Home
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/dashboard" className="block text-gray-700 hover:text-cyan-600 transition duration-200 py-2" onClick={handleLinkClick}>
            Dashboard
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/doctors" className="block text-gray-700 hover:text-cyan-600 transition duration-200 py-2" onClick={handleLinkClick}>
            Doctors
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/services" className="block text-gray-700 hover:text-cyan-600 transition duration-200 py-2" onClick={handleLinkClick}>
            Services
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/records" className="block text-gray-700 hover:text-cyan-600 transition duration-200 py-2" onClick={handleLinkClick}>
            Medical Records
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/assistant" className="block text-gray-700 hover:text-cyan-600 transition duration-200 py-2" onClick={handleLinkClick}>
            Personal Assistant
          </Link>
        </motion.div>
        
        {user ? (
          <>
            <motion.div variants={itemVariants} className="border-t border-gray-100 pt-3">
              <div className="flex items-center text-gray-700 mb-2">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mr-2">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-sm font-medium">{user.displayName || user.email}</div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt mr-2"></i> Log Out
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div variants={itemVariants} className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={openLoginModal}>
              Login
            </Button>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600" onClick={openSignupModal}>
              Sign Up
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
