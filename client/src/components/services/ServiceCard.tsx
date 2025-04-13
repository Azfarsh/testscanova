import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const cardVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden mx-2 my-4 max-w-sm"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-40 object-contain p-2" 
        />
        <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {service.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>

        <h4 className="font-semibold text-gray-800 mb-2">{service.howItWorksTitle}:</h4>
        {service.steps ? (
          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
            {service.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <ul className="mb-6 space-y-2">
            {service.features?.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <i className="fas fa-check text-green-500 mr-2"></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">{service.duration}</span>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <div className="flex text-yellow-400 mr-2">
                {Array(5).fill(0).map((_, i) => (
                  <i key={i} className={`${i < Math.floor(service.rating) ? 'fas fa-star' : i + 0.5 === service.rating ? 'fas fa-star-half-alt' : 'far fa-star'}`}></i>
                ))}
              </div>
              <span>{service.rating.toFixed(1)} ({service.reviews} users)</span>
            </div>
          </div>
          <Button 
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={() => window.location.href = service.actionLink}
          >
            {service.actionText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;