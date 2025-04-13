import { motion } from 'framer-motion';

const benefitsData = [
  {
    icon: "fas fa-clock",
    title: "Early Disease Detection",
    description: "Our AI-powered screening tools can detect early signs of diseases, allowing for timely intervention and better outcomes."
  },
  {
    icon: "fas fa-globe",
    title: "Accessible Healthcare",
    description: "Bring advanced healthcare to rural and underserved areas through our cloud-based platform and remote consultations."
  },
  {
    icon: "fas fa-dollar-sign",
    title: "Cost-Effective Solutions",
    description: "Reduce healthcare costs by minimizing the need for expensive tests and physical visits through our AI-powered diagnostics."
  },
  {
    icon: "fas fa-database",
    title: "Unified Medical Records",
    description: "Keep all your medical information in one secure place, accessible whenever you need it and shareable with healthcare providers."
  }
];

const Benefits = () => {
  const containerVariants = {
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

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose Scanova</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our platform combines cutting-edge AI technology with healthcare expertise to provide benefits that traditional systems can't match.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="flex"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 mr-4">
                <motion.div 
                  className="bg-cyan-100 rounded-full p-3 text-cyan-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className={`${benefit.icon} text-xl`}></i>
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Benefits;
