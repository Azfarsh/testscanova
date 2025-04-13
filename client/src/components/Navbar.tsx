import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useauth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  toggleMobileMenu: () => void;
  openLoginModal: () => void;
  openSignupModal: () => void;
}

const Navbar = ({ toggleMobileMenu, openLoginModal, openSignupModal }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/doctors', label: 'Doctors' },
    { href: '/services', label: 'Services' },
    { href: '/records', label: 'Medical Records' },
    { href: '/assistant', label: 'Personal Assistant' },
    { href: '/schemes', label: 'Government Health Schemes' }, // 👈 Added here
  ];

  const iconAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 10, -10, 0] as number[],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-2xl font-bold text-cyan-600 mr-10">
            <motion.span 
              className="text-3xl mr-2"
              variants={iconAnimation}
              initial="initial"
              animate="animate"
            >
              <i className="fa-solid fa-heart-pulse"></i>
            </motion.span>
            <span>Scanova</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setLocation(link.href)}
                className={`text-gray-700 hover:text-cyan-600 transition duration-200 py-2 ${location === link.href ? 'text-cyan-600 font-medium' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                    <AvatarFallback className="bg-cyan-100 text-cyan-800">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/records">Medical Records</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700" onClick={openLoginModal}>Login</Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" onClick={openSignupModal}>Sign Up</Button>
            </>
          )}
          <button 
            className="md:hidden text-gray-700 hover:text-cyan-600 transition duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
