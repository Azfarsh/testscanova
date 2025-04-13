import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import UserProfile from '@/components/dashboard/UserProfile';
import { auth } from '@/lib/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button, ButtonProps } from '@/components/ui/button';
import Overview from '../components/dashboard/Overview';
import HealthMetrics from '../components/dashboard/HealthMetrics';
import ScreeningResults from '../components/dashboard/ScreeningResults';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Static demo data
  const userData = {
    name: 'User',
    healthScore: 85,
    healthScoreChange: 3,
    recentScreenings: 2,
    lastScreeningType: 'Voice Analysis',
    lastScreeningDate: 'March 15, 2023',
    upcomingAppointments: 1,
    nextAppointmentDoctor: 'Dr. Sarah Wilson',
    nextAppointmentDate: 'March 22, 2023',
    nextAppointmentTime: '10:00 AM',
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  

  
  return (
    <>
      <Helmet>
        <title>Dashboard | Scanova</title>
      </Helmet>
      
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4">
            <UserProfile user={auth.currentUser!} />
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <motion.div 
              className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:w-1/4' : 'md:w-16'} mb-6 md:mb-0`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
  <h2 className={`text-xl font-bold text-gray-800 ${!isSidebarOpen && 'hidden'}`}>Dashboard</h2>
  <Button
    variant="ghost"
    size="icon"
    onClick={toggleSidebar}
    className="h-8 w-8"
  >
    <i className={`fas fa-${isSidebarOpen ? 'chevron-left' : 'chevron-right'}`}></i>
  </Button>
</div>
                  <nav>
                    <ul className="space-y-2">
                      <li>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start ${activeTab === 'overview' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'}`}
                          onClick={() => setActiveTab('overview')}
                        >
                          <i className="fas fa-home mr-3"></i>
                          <span className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Overview</span>
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start ${activeTab === 'health-metrics' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'}`}
                          onClick={() => setActiveTab('health-metrics')}
                        >
                          <i className="fas fa-chart-line mr-3"></i>
                          <span>Health Metrics</span>
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start ${activeTab === 'upcoming' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'}`}
                          onClick={() => setActiveTab('upcoming')}
                        >
                          <i className="fas fa-calendar-alt mr-3"></i>
                          <span>Upcoming Appointments</span>
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start ${activeTab === 'screening' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'}`}
                          onClick={() => setActiveTab('screening')}
                        >
                          <i className="fas fa-microscope mr-3"></i>
                          <span>Screening Results</span>
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start ${activeTab === 'medications' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'}`}
                          onClick={() => setActiveTab('medications')}
                        >
                          <i className="fas fa-pills mr-3"></i>
                          <span>Medications</span>
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start ${activeTab === 'recommendations' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'}`}
                          onClick={() => setActiveTab('recommendations')}
                        >
                          <i className="fas fa-lightbulb mr-3"></i>
                          <span>Recommendations</span>
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Main Dashboard Content */}
            <motion.div 
              className="md:w-3/4 md:pl-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsContent value="overview" className="space-y-6 m-0">
                  <Overview user={userData} />
                  <HealthMetrics />
                  <ScreeningResults />
                  <QuickActions />
                </TabsContent>
                
                <TabsContent value="health-metrics" className="space-y-6 m-0">
                  <HealthMetrics />
                </TabsContent>
                
                <TabsContent value="upcoming" className="space-y-6 m-0">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
                      <div className="text-center py-8">
                        <div className="text-5xl text-cyan-500 mb-4">
                          <i className="far fa-calendar-check"></i>
                        </div>
                        <h4 className="text-lg font-medium mb-2">Next Appointment: Dr. Sarah Wilson</h4>
                        <p className="text-gray-600">March 22, 2023 - 10:00 AM</p>
                        <Button className="mt-4 bg-cyan-500 hover:bg-cyan-600">
                          <i className="fas fa-video mr-2"></i>
                          Join Video Consultation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="screening" className="space-y-6 m-0">
                  <ScreeningResults />
                </TabsContent>
                
                <TabsContent value="medications" className="space-y-6 m-0">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Medications</h3>
                      <div className="text-center py-8">
                        <div className="text-5xl text-cyan-500 mb-4">
                          <i className="fas fa-prescription-bottle-alt"></i>
                        </div>
                        <h4 className="text-lg font-medium mb-2">No Active Medications</h4>
                        <p className="text-gray-600">Your medications will appear here once prescribed by your doctor.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-6 m-0">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Recommendations</h3>
                      <div className="space-y-4">
                        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
                          <h4 className="font-medium text-gray-800">Increase Water Intake</h4>
                          <p className="text-gray-600">Based on your recent data, we recommend increasing your daily water intake to 8-10 glasses.</p>
                        </div>
                        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
                          <h4 className="font-medium text-gray-800">Schedule Eye Exam</h4>
                          <p className="text-gray-600">Your last eye exam was over 12 months ago. We recommend scheduling a check-up.</p>
                        </div>
                        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
                          <h4 className="font-medium text-gray-800">Take Regular Breaks</h4>
                          <p className="text-gray-600">To reduce eye strain, follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
