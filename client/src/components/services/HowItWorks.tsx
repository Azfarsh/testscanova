import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: 'fas fa-upload',
    title: 'Input Data',
    description: 'Provide voice samples or upload medical images securely to our platform.'
  },
  {
    icon: 'fas fa-robot',
    title: 'AI Processing',
    description: 'Our advanced AI models analyze the data using proven medical algorithms.'
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Results & Insights',
    description: 'Receive detailed analysis with confidence scores and personalized insights.'
  },
  {
    icon: 'fas fa-user-md',
    title: 'Doctor Review',
    description: 'Share results with healthcare providers for follow-up if recommended.'
  }
];

const HowItWorks = () => {
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
    <Card className="mb-12">
      <CardContent className="p-8">
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          How Our Smart Screening Works
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              variants={itemVariants}
            >
              <motion.div 
                className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <i className={step.icon}></i>
              </motion.div>
              <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;
