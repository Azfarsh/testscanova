import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';

const Testimonials = () => {
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
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">What Our Users Say</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from patients and healthcare professionals who have experienced the benefits of Scanova.</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-xl shadow-md p-6"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-center mb-4">
              <div className="text-cyan-500 mr-2">
                {Array(5).fill(0).map((_, i) => (
                  <i key={i} className={`${i < testimonial.rating ? 'fas fa-star' : i + 0.5 === testimonial.rating ? 'fas fa-star-half-alt' : 'far fa-star'}`}></i>
                ))}
              </div>
              <span className="text-gray-600 text-sm">{testimonial.rating.toFixed(1)}</span>
            </div>
            <p className="text-gray-700 mb-6">{testimonial.content}</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;
