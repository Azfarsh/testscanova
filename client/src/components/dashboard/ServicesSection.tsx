import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaLungs,
  FaNotesMedical,
  FaBrain,
  FaVial,
  FaXRay,
  FaHeartbeat,
} from "react-icons/fa";
import { Link } from "wouter";

const services = [
  {
    icon: <FaNotesMedical size={20} />,
    title: "Skin Cancer Detection",
    description: "Upload skin images for instant AI analysis",
    link: "#",
    image: "/images/skin-cancer.jpg", // Placeholder image path
    name: "Skin Cancer Detection",
    inputType: "Image Upload",
  },
  {
    icon: <FaHeartbeat size={20} />,
    title: "Breast Cancer Screening",
    description: "Analyze mammogram images with AI",
    link: "#",
    image: "/images/breast-cancer.jpg", // Placeholder image path
    name: "Breast Cancer Screening",
    inputType: "Image Upload",
  },
  {
    icon: <FaLungs size={20} />,
    title: "Lung Cancer Detection",
    description: "CT scan and X-ray analysis",
    link: "#",
    image: "/images/lung-cancer.jpg", // Placeholder image path
    name: "Lung Cancer Detection",
    inputType: "Image Upload",
  },
  {
    icon: <FaXRay size={20} />,
    title: "Tuberculosis Screening",
    description: "X-ray and CT scan analysis",
    link: "#",
    image: "/images/tuberculosis.jpg", // Placeholder image path
    name: "Tuberculosis Screening",
    inputType: "Image Upload",
  },
  {
    icon: <FaBrain size={24} />,
    title: "Parkinson's Detection",
    description: "Voice recording analysis",
    link: "/parkinson-recorder",
    image: "/images/parkinsons.jpg", // Placeholder image path
    name: "Parkinson's Detection",
    inputType: "Voice Recording",
  },
  {
    icon: <FaVial size={20} />,
    title: "Medical Records",
    description: "Store and manage your health records",
    link: "#",
    image: "/images/medical-records.jpg", // Placeholder image path
    name: "Medical Records",
    inputType: "Document Upload",
  },
];

const ServicesSection = () => {
  return (
    <section className="mt-16 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-102">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
            </div>
            <p className="text-gray-600 mb-4 min-h-[3rem]">{service.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <i className={`fas fa-${service.inputType === 'Image Upload' ? 'camera' : service.inputType === 'Voice Recording' ? 'microphone' : 'file-upload'} mr-2`}></i>
              <span>Input Type: {service.inputType}</span>
            </div>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              <i className={`fas fa-${service.icon.type.name === 'FaLungs' ? 'lungs' : 
                service.icon.type.name === 'FaBrain' ? 'brain' : 
                service.icon.type.name === 'FaHeartbeat' ? 'heartbeat' : 
                'stethoscope'} mr-2`}></i>
              Start Screening
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;