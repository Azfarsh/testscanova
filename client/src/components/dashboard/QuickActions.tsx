import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import ServicesSection from './ServicesSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const QuickActions = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12 space-y-12">
      {/* Animated Grid Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Personal Health Assistant */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Assistant</h3>
              <p className="text-gray-600 mb-4">Get personalized health recommendations and answers to your questions.</p>
              <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                <Link href="/assistant">
                  <i className="fas fa-robot mr-2"></i>
                  Chat with Assistant
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart Screening */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Screening</h3>
              <p className="text-gray-600 mb-4">Schedule a new screening or upload data for analysis by our AI tools.</p>
              <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                <Link href="/services">
                  <i className="fas fa-stethoscope mr-2"></i>
                  Start New Screening
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Services Section (Full Width) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <ServicesSection />
      </motion.div>
    </div>
  );
};

export default QuickActions;
