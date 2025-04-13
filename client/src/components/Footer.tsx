import { Link } from 'wouter';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    services: [
      { href: "/services#voice", label: "Voice Analysis" },
      { href: "/services#image", label: "Image Screening" },
      { href: "/doctors", label: "Doctor Consultations" },
      { href: "/records", label: "Medical Records" },
      { href: "/assistant", label: "AI Health Assistant" }
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Our Team" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "News & Blog" },
      { href: "/contact", label: "Contact Us" }
    ],
    support: [
      { href: "/help", label: "Help Center" },
      { href: "/faq", label: "FAQs" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/hipaa", label: "HIPAA Compliance" }
    ]
  };

  const fadeInUpItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpItem}
          >
            <div className="flex items-center text-2xl font-bold mb-4">
              <span className="text-3xl mr-2"><i className="fa-solid fa-heart-pulse text-cyan-400"></i></span>
              <span>Scanova</span>
            </div>
            <p className="text-gray-400 mb-4">Revolutionizing healthcare with AI-driven technology for accessible and affordable medical screening.</p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="text-gray-400 hover:text-cyan-400 transition duration-200"
                  aria-label={`${social} link`}
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpItem}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpItem}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpItem}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Scanova Health Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
