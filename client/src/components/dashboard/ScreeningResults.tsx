import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const screeningResultsMock = [
  {
    id: 1,
    type: 'Voice Analysis',
    icon: 'fa-microphone-alt',
    date: 'Mar 15, 2023',
    result: 'Normal',
    resultType: 'success',
    confidence: '97%',
  },
  {
    id: 2,
    type: 'Lung X-Ray Analysis',
    icon: 'fa-x-ray',
    date: 'Mar 10, 2023',
    result: 'Follow-up Recommended',
    resultType: 'warning',
    confidence: '89%',
  },
  {
    id: 3,
    type: 'Skin Lesion Check',
    icon: 'fa-microscope',
    date: 'Feb 28, 2023',
    result: 'Normal',
    resultType: 'success',
    confidence: '94%',
  },
  {
    id: 4,
    type: 'Retinal Scan',
    icon: 'fa-eye',
    date: 'Feb 15, 2023',
    result: 'Anomaly Detected',
    resultType: 'danger',
    confidence: '92%',
  },
];

const ScreeningResults = () => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const getResultBadgeColor = (resultType: string) => {
    switch (resultType) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Screening Results</h3>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Screening Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {screeningResultsMock.map((result) => (
                  <TableRow key={result.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="text-cyan-500 mr-3">
                          <i className={`fas ${result.icon}`}></i>
                        </div>
                        <span className="font-medium text-gray-800">{result.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{result.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getResultBadgeColor(result.resultType)}`}>
                        {result.result}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{result.confidence}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" className="text-cyan-600 hover:text-cyan-800 font-medium">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScreeningResults;
