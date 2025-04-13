import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import DoctorCard from '../components/doctors/DoctorCard';
import DoctorSearch from '../components/doctors/DoctorSearch';
import { doctors } from '../data/doctors';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const DoctorsPage = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;
  
  // Get unique specialties for filter dropdown
  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));
  
  const handleSearch = ({ query, specialty }: { query: string; specialty: string }) => {
    const filtered = doctors.filter(doctor => {
      const matchesQuery = !query || 
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase());
      
      const matchesSpecialty = specialty === 'all' || 
        doctor.specialty.toLowerCase() === specialty.toLowerCase();
      
      return matchesQuery && matchesSpecialty;
    });
    
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };
  
  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  
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
    <>
      <Helmet>
        <title>Connect with Specialists | Scanova</title>
      </Helmet>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Connect with Specialists</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find and consult with qualified healthcare professionals remotely through our secure platform.</p>
          </motion.div>
          
          {/* Search and Filters */}
          <DoctorSearch 
            specialties={specialties} 
            onSearch={handleSearch} 
          />
          
          {/* Doctors Grid */}
          {currentDoctors.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentDoctors.map((doctor) => (
                <motion.div key={doctor.id} variants={itemVariants}>
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl text-gray-300 mb-4">
                <i className="fas fa-user-md"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Doctors Found</h2>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </motion.div>
          )}
          
          {/* Pagination */}
          {filteredDoctors.length > doctorsPerPage && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                      className={currentPage === index + 1 ? "bg-cyan-500 text-white" : ""}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorsPage;
