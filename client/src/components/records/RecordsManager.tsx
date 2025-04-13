import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MedicalRecord } from '../../types';
import UploadSection from './UploadSection';

interface RecordsManagerProps {
  records: MedicalRecord[];
  onView: (record: MedicalRecord) => void;
  onDownload: (record: MedicalRecord) => void;
  onShare: (record: MedicalRecord) => void;
  onDelete: (record: MedicalRecord) => void;
}

const RecordsManager = ({ 
  records, 
  onView, 
  onDownload, 
  onShare, 
  onDelete 
}: RecordsManagerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || record.type.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  
  const filterTypes = ['all', 'lab results', 'prescriptions', 'imaging', 'reports'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Tabs Navigation */}
      <Tabs defaultValue="myrecords">
        <div className="border-b border-gray-200">
          <TabsList className="h-12">
            <TabsTrigger value="myrecords" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 font-medium rounded-none bg-transparent">
              My Records
            </TabsTrigger>
            <TabsTrigger value="shared" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 font-medium rounded-none bg-transparent">
              Shared with Me
            </TabsTrigger>
            <TabsTrigger value="activity" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 font-medium rounded-none bg-transparent">
              Recent Activity
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="myrecords" className="p-6">
          {/* Upload Section */}
          <div className="mb-8">
            <UploadSection />
          </div>
          
          {/* Records Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex flex-wrap items-center mb-4 md:mb-0 gap-2">
              {filterTypes.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full text-sm ${activeFilter === filter ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search records..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          
          {/* Records List */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="text-cyan-500 mr-3">
                            <i className={`fas ${record.icon}`}></i>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{record.fileName}</div>
                            <div className="text-xs text-gray-500">{record.fileType} • {record.fileSize}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${record.typeBadgeColor}`}>
                          {record.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">{record.date}</TableCell>
                      <TableCell className="text-gray-600">{record.source}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-cyan-600" 
                            onClick={() => onView(record)}
                            title="View"
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-cyan-600" 
                            onClick={() => onDownload(record)}
                            title="Download"
                          >
                            <i className="fas fa-download"></i>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-cyan-600" 
                            onClick={() => onShare(record)}
                            title="Share"
                          >
                            <i className="fas fa-share-alt"></i>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-red-600" 
                            onClick={() => onDelete(record)}
                            title="Delete"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">
                          <i className="fas fa-folder-open"></i>
                        </div>
                        <p>No records found. Upload new records or adjust your search filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {filteredRecords.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-gray-600 text-sm">
                Showing 1-{Math.min(filteredRecords.length, 10)} of {filteredRecords.length} records
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8 mr-1" disabled>
                  <i className="fas fa-chevron-left"></i>
                </Button>
                <Button variant="default" size="sm" className="bg-cyan-500 text-white mr-1 h-8 min-w-8">1</Button>
                <Button variant="outline" size="sm" className="mr-1 h-8 min-w-8">2</Button>
                <Button variant="outline" size="sm" className="mr-1 h-8 min-w-8">3</Button>
                <Button variant="outline" size="sm" className="mr-1 h-8 min-w-8">4</Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="shared" className="p-6">
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">
              <i className="fas fa-share-alt"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Shared Records</h3>
            <p className="text-gray-500">Records shared with you by healthcare providers will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="p-6">
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">
              <i className="fas fa-history"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Recent Activity</h3>
            <p className="text-gray-500">Your recent record activity will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RecordsManager;
