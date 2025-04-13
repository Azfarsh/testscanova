import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import RecordsManager from '../components/records/RecordsManager';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MedicalRecord } from '../types';

// Mock medical records data - would normally come from Firebase
const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    fileName: 'Annual Physical Results',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    icon: 'fa-file-medical',
    type: 'Lab Results',
    typeBadgeColor: 'bg-green-100 text-green-800',
    date: 'Mar 15, 2023',
    source: 'City Medical Center',
    url: '#'
  },
  {
    id: '2',
    fileName: 'Chest X-Ray',
    fileType: 'DICOM',
    fileSize: '15.8 MB',
    icon: 'fa-file-image',
    type: 'Imaging',
    typeBadgeColor: 'bg-purple-100 text-purple-800',
    date: 'Feb 28, 2023',
    source: 'Radiology Partners',
    url: '#'
  },
  {
    id: '3',
    fileName: 'Prescription - Lisinopril',
    fileType: 'PDF',
    fileSize: '0.8 MB',
    icon: 'fa-prescription',
    type: 'Prescription',
    typeBadgeColor: 'bg-blue-100 text-blue-800',
    date: 'Feb 15, 2023',
    source: 'Dr. Michael Chen',
    url: '#'
  },
  {
    id: '4',
    fileName: 'Blood Test Results',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    icon: 'fa-file-medical-alt',
    type: 'Lab Results',
    typeBadgeColor: 'bg-green-100 text-green-800',
    date: 'Jan 20, 2023',
    source: 'LabCorp',
    url: '#'
  }
];

const MedicalRecordsPage = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
useEffect(() => {
  // Clear existing records when component mounts
  setRecords([]);
}, []);
  
  const handleViewRecord = (record: MedicalRecord) => {
    toast({
      title: "Viewing record",
      description: `Opening ${record.fileName}`,
    });
  };
  
  const handleDownloadRecord = (record: MedicalRecord) => {
    toast({
      title: "Downloading record",
      description: `${record.fileName} is being downloaded`,
    });
  };
  
  const handleShareRecord = (record: MedicalRecord) => {
    toast({
      title: "Share options",
      description: `Share options for ${record.fileName}`,
    });
  };
  
  const handleDeleteRecord = (record: MedicalRecord) => {
    toast({
      title: "Record deleted",
      description: `${record.fileName} has been deleted`,
    });
    setRecords(records.filter(r => r.id !== record.id));
  };
  
  return (
    <>
      <Helmet>
        <title>Medical Records | Scanova</title>
      </Helmet>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Medical Records Management</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Securely store, organize, and access your medical documents and health information in one place.</p>
          </motion.div>
          
          {/* Records Interface */}
          <RecordsManager 
            records={records} 
            onView={handleViewRecord}
            onDownload={handleDownloadRecord}
            onShare={handleShareRecord}
            onDelete={handleDeleteRecord}
          />
          
          {/* Security Information */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-2/3 mb-6 md:mb-0">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Your Data Security is Our Priority</h2>
                    <p className="text-gray-600">All your medical records are encrypted using industry-standard AES-256 encryption. Our secure cloud storage ensures your data is protected while remaining accessible when you need it.</p>
                    <div className="mt-4 flex items-center space-x-6">
                      <div className="flex items-center">
                        <div className="text-green-500 mr-2"><i className="fas fa-shield-alt"></i></div>
                        <span className="text-gray-700 text-sm">HIPAA Compliant</span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-green-500 mr-2"><i className="fas fa-lock"></i></div>
                        <span className="text-gray-700 text-sm">End-to-End Encryption</span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-green-500 mr-2"><i className="fas fa-user-shield"></i></div>
                        <span className="text-gray-700 text-sm">Access Control</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="text-8xl text-cyan-500 opacity-80">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MedicalRecordsPage;
