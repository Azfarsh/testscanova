import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

interface OverviewProps {
  user: {
    name: string;
    healthScore: number;
    healthScoreChange: number;
    recentScreenings: number;
    lastScreeningType: string;
    lastScreeningDate: string;
    upcomingAppointments: number;
    nextAppointmentDoctor: string;
    nextAppointmentDate: string;
    nextAppointmentTime: string;
  };
}

const Overview = ({ user }: OverviewProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Welcome Banner */}
      <motion.div 
        className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg shadow-md p-6 mb-6 text-white"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p>Your health dashboard is updated and ready for review.</p>
          </div>
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)} className="text-5xl opacity-80 hover:opacity-100 transition-opacity">
              <i className="fas fa-user-circle"></i>
            </button>
            {showProfile && (
              <div className="absolute right-0 top-16 w-64 bg-white rounded-lg shadow-xl z-50 p-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center mb-3">
                    <i className="fas fa-user text-3xl text-cyan-600"></i>
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="mt-4 w-full">
                    <button className="w-full bg-cyan-500 text-white rounded-md py-2 hover:bg-cyan-600 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Dashboard Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Health Score Card */}
        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Health Score</h3>
                <div className="text-cyan-500">
                  <i className="fas fa-heartbeat"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-4xl font-bold text-gray-800 mr-3">{user.healthScore}</div>
                <div className={`${user.healthScoreChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs px-2 py-1 rounded-full`}>
                  <i className={`fas fa-arrow-${user.healthScoreChange >= 0 ? 'up' : 'down'} mr-1`}></i>
                  <span>{Math.abs(user.healthScoreChange)}%</span>
                </div>
              </div>
              <Progress value={user.healthScore} className="mt-4 h-2.5 bg-gray-200" indicatorClassName="bg-cyan-600" />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recent Screenings Card */}
        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Recent Screenings</h3>
                <div className="text-cyan-500">
                  <i className="fas fa-stethoscope"></i>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-4">{user.recentScreenings}</div>
              <div className="text-sm text-gray-600">
                Last screening: <span className="font-medium">{user.lastScreeningType}</span>
                <div className="text-xs text-gray-500">{user.lastScreeningDate}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Upcoming Appointments Card */}
        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Upcoming Appointments</h3>
                <div className="text-cyan-500">
                  <i className="fas fa-calendar-check"></i>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-4">{user.upcomingAppointments}</div>
              <div className="text-sm text-gray-600">
                Next appointment: <span className="font-medium">{user.nextAppointmentDoctor}</span>
                <div className="text-xs text-gray-500">{user.nextAppointmentDate} - {user.nextAppointmentTime}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Overview;
