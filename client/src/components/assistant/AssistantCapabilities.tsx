import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const capabilities = [
  {
    icon: 'fas fa-brain',
    title: 'Personalized Health Insights',
    description: 'The AI assistant analyzes your health data, screening results, and medical history to provide personalized recommendations and insights tailored to your specific needs.'
  },
  {
    icon: 'fas fa-bell',
    title: 'Smart Reminders',
    description: 'Set up medication reminders, appointment alerts, and health habit notifications to stay on track with your healthcare routine and never miss important events.'
  },
  {
    icon: 'fas fa-file-medical-alt',
    title: 'Medical Information Simplified',
    description: 'Get complex medical terms and test results explained in simple language, helping you better understand your health condition and treatment options.'
  },
  {
    icon: 'fas fa-heart',
    title: 'Wellness Coaching',
    description: 'Receive tailored advice on nutrition, exercise, sleep, and stress management based on your health profile and goals to improve your overall wellbeing.'
  }
];

const AssistantCapabilities = () => {
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
    <motion.div
      className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {capabilities.map((capability, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="text-cyan-500 text-3xl mb-4">
                <i className={capability.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{capability.title}</h3>
              <p className="text-gray-600">{capability.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AssistantCapabilities;
