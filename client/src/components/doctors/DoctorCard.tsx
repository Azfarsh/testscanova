import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
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
      className="bg-white rounded-lg shadow-md overflow-hidden"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="relative">
        <img 
          src={doctor.image} 
          alt={`Dr. ${doctor.name}`} 
          className="w-full h-48 object-cover" 
        />
        <div className={`absolute top-4 right-4 ${doctor.isAvailable ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs font-bold px-2 py-1 rounded-full`}>
          {doctor.isAvailable ? 'Available' : 'Busy'}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Dr. {doctor.name}</h3>
        <p className="text-cyan-600 mb-3">{doctor.specialty}</p>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex text-yellow-400 mr-2">
            {Array(5).fill(0).map((_, i) => (
              <i key={i} className={`${i < Math.floor(doctor.rating) ? 'fas fa-star' : i + 0.5 === doctor.rating ? 'fas fa-star-half-alt' : 'far fa-star'}`}></i>
            ))}
          </div>
          <span>{doctor.rating.toFixed(1)} ({doctor.reviews} reviews)</span>
        </div>
        <div className="mb-5">
          <div className="flex items-center text-gray-700 mb-2">
            <i className="fas fa-graduation-cap w-5 mr-2"></i>
            <span>{doctor.education}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <i className="fas fa-briefcase w-5 mr-2"></i>
            <span>{doctor.experience}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <i className="fas fa-language w-5 mr-2"></i>
            <span>{doctor.languages.join(', ')}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline">
            View Profile
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            Book Consultation
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
