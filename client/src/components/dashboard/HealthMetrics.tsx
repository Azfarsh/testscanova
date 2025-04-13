import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const mockHealthData = {
  week: [
    { day: 'Mon', bloodPressure: 120, heartRate: 72, sleepQuality: 85, activityLevel: 67 },
    { day: 'Tue', bloodPressure: 118, heartRate: 70, sleepQuality: 82, activityLevel: 72 },
    { day: 'Wed', bloodPressure: 122, heartRate: 73, sleepQuality: 78, activityLevel: 65 },
    { day: 'Thu', bloodPressure: 119, heartRate: 71, sleepQuality: 88, activityLevel: 70 },
    { day: 'Fri', bloodPressure: 121, heartRate: 74, sleepQuality: 80, activityLevel: 75 },
    { day: 'Sat', bloodPressure: 117, heartRate: 69, sleepQuality: 90, activityLevel: 60 },
    { day: 'Sun', bloodPressure: 118, heartRate: 70, sleepQuality: 87, activityLevel: 68 },
  ],
  month: [
    { day: 'Week 1', bloodPressure: 119, heartRate: 71, sleepQuality: 84, activityLevel: 69 },
    { day: 'Week 2', bloodPressure: 120, heartRate: 72, sleepQuality: 82, activityLevel: 71 },
    { day: 'Week 3', bloodPressure: 118, heartRate: 70, sleepQuality: 86, activityLevel: 68 },
    { day: 'Week 4', bloodPressure: 121, heartRate: 73, sleepQuality: 83, activityLevel: 72 },
  ],
  year: [
    { day: 'Jan', bloodPressure: 122, heartRate: 74, sleepQuality: 80, activityLevel: 65 },
    { day: 'Feb', bloodPressure: 121, heartRate: 73, sleepQuality: 82, activityLevel: 68 },
    { day: 'Mar', bloodPressure: 120, heartRate: 72, sleepQuality: 84, activityLevel: 70 },
    { day: 'Apr', bloodPressure: 119, heartRate: 71, sleepQuality: 83, activityLevel: 72 },
    { day: 'May', bloodPressure: 118, heartRate: 70, sleepQuality: 85, activityLevel: 75 },
    { day: 'Jun', bloodPressure: 117, heartRate: 69, sleepQuality: 86, activityLevel: 76 },
    { day: 'Jul', bloodPressure: 119, heartRate: 70, sleepQuality: 84, activityLevel: 74 },
    { day: 'Aug', bloodPressure: 120, heartRate: 71, sleepQuality: 83, activityLevel: 73 },
    { day: 'Sep', bloodPressure: 121, heartRate: 72, sleepQuality: 81, activityLevel: 71 },
    { day: 'Oct', bloodPressure: 122, heartRate: 73, sleepQuality: 80, activityLevel: 69 },
    { day: 'Nov', bloodPressure: 120, heartRate: 72, sleepQuality: 82, activityLevel: 70 },
    { day: 'Dec', bloodPressure: 119, heartRate: 71, sleepQuality: 83, activityLevel: 72 },
  ],
};

type TimePeriod = 'week' | 'month' | 'year';

const HealthMetrics = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Health Metrics</h3>
            <div className="flex space-x-2">
              <Button
                variant={timePeriod === 'week' ? 'default' : 'outline'}
                className={timePeriod === 'week' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''}
                onClick={() => setTimePeriod('week')}
              >
                Week
              </Button>
              <Button
                variant={timePeriod === 'month' ? 'default' : 'outline'}
                className={timePeriod === 'month' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''}
                onClick={() => setTimePeriod('month')}
              >
                Month
              </Button>
              <Button
                variant={timePeriod === 'year' ? 'default' : 'outline'}
                className={timePeriod === 'year' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''}
                onClick={() => setTimePeriod('year')}
              >
                Year
              </Button>
            </div>
          </div>
          
          <div className="w-full h-64 bg-white rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockHealthData[timePeriod]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bloodPressure" stroke="#00B5D8" activeDot={{ r: 8 }} name="Blood Pressure" />
                <Line type="monotone" dataKey="heartRate" stroke="#10B981" name="Heart Rate" />
                <Line type="monotone" dataKey="sleepQuality" stroke="#8B5CF6" name="Sleep Quality" />
                <Line type="monotone" dataKey="activityLevel" stroke="#F59E0B" name="Activity Level" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
              <span className="text-sm text-gray-600">Blood Pressure</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Heart Rate</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-600">Sleep Quality</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-600">Activity Level</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HealthMetrics;
