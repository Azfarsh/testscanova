import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  MicIcon, 
  PlayIcon, 
  SquareIcon, 
  DownloadIcon, 
  FileTextIcon, 
  ChevronRightIcon,
  ActivityIcon,
  HeartPulseIcon,
  BrainIcon,
  AlertTriangleIcon
} from 'lucide-react';

// Types for voice analysis
interface VoiceTest {
  id: string;
  name: string;
  instructions: string;
  duration: string;
  metrics: string[];
  completed: boolean;
}

interface AnalysisResult {
  id: string;
  testId: string;
  vocalStability: number;
  breathingRate: number;
  duration: number;
  timestamp: number;
}

interface HealthAssessment {
  overallScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  confidence: number;
  keyFindings: string[];
}

interface Recommendation {
  action: string;
  impact: 'Low' | 'Medium' | 'High';
  urgency: 'Low' | 'Medium' | 'High';
}

// Mock data for tests based on the Python app
const voiceTests: VoiceTest[] = [
  {
    id: 'sustained_vowel',
    name: 'Sustained Vowel Analysis',
    instructions: 'Say "Aaaaah" for as long as you can in a steady tone',
    duration: '10-15 seconds',
    metrics: ['Vocal Stability', 'Breath Support', 'Pitch Analysis'],
    completed: false
  },
  {
    id: 'counting_breath',
    name: 'Respiratory Capacity Test',
    instructions: 'Count from 1 to 30 in a single breath at a steady pace',
    duration: '15-20 seconds',
    metrics: ['Breath Control', 'Speech Rate', 'Voice Quality'],
    completed: false
  },
  {
    id: 'cough_pattern',
    name: 'Cough Analysis',
    instructions: 'Provide three natural coughs with brief pauses',
    duration: '5-10 seconds',
    metrics: ['Cough Strength', 'Cough Pattern', 'Airways Assessment'],
    completed: false
  },
  {
    id: 'speech_sample',
    name: 'Connected Speech Analysis',
    instructions: 'Read the following paragraph naturally: "The rainbow appears after the rain, creating a beautiful arc of colors in the sky. Take a deep breath before starting and try to read this in your natural speaking voice."',
    duration: '30-40 seconds',
    metrics: ['Articulation', 'Prosody', 'Voice Quality'],
    completed: false
  },
  {
    id: 'breathing_pattern',
    name: 'Breathing Pattern Analysis',
    instructions: 'Breathe normally for the specified duration',
    duration: '20 seconds',
    metrics: ['Breathing Rate', 'Breath Depth', 'Regularity'],
    completed: false
  },
  {
    id: 'articulation_test',
    name: 'Articulation Practice',
    instructions: 'Read the following tongue twisters with clear pronunciation: "Peter Piper picked a peck of pickled peppers" and "She sells seashells by the seashore"',
    duration: '45 seconds',
    metrics: ['pronunciation_clarity', 'speech_rate', 'accuracy'],
    completed: false
  }
];

const VocalAnalysisPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTest, setCurrentTest] = useState<VoiceTest | null>(null);
  const [tests, setTests] = useState<VoiceTest[]>(voiceTests);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState('record');

  // Steps for the vocal analysis process
  const steps = [
    { id: 'info', title: 'Patient Information' },
    { id: 'tests', title: 'Voice Testing' },
    { id: 'results', title: 'Analysis Results' },
    { id: 'recommendations', title: 'Recommendations' }
  ];

  // Simulate recording start
  const startRecording = (test: VoiceTest) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to record voice samples",
        variant: "destructive"
      });
      return;
    }

    setCurrentTest(test);
    setIsRecording(true);
    
    // Simulate recording for demo purposes
    setTimeout(() => {
      stopRecording();
    }, 5000);
  };

  // Simulate recording stop with analysis
  const stopRecording = () => {
    if (!currentTest) return;

    setIsRecording(false);
    
    // Mark test as completed
    const updatedTests = tests.map(test => 
      test.id === currentTest.id ? { ...test, completed: true } : test
    );
    setTests(updatedTests);
    
    // Generate mock analysis result
    const newResult: AnalysisResult = {
      id: `result_${Date.now()}`,
      testId: currentTest.id,
      vocalStability: Math.floor(Math.random() * 30) + 70, // 70-100 range
      breathingRate: Math.floor(Math.random() * 10) + 10, // 10-20 range
      duration: Math.floor(Math.random() * 15) + 5, // 5-20 seconds
      timestamp: Date.now()
    };
    
    setResults([...results, newResult]);
    toast({
      title: "Analysis Complete",
      description: `${currentTest.name} analysis completed successfully.`
    });
    
    setCurrentTest(null);
    
    // If all tests are completed, generate assessment
    if (updatedTests.every(test => test.completed)) {
      generateAssessment();
    }
  };

  // Generate health assessment based on results
  const generateAssessment = () => {
    // In a real app, this would be done with a backend call
    const newAssessment: HealthAssessment = {
      overallScore: Math.floor(Math.random() * 20) + 80, // 80-100 range
      riskLevel: 'Low',
      confidence: Math.floor(Math.random() * 10) + 90, // 90-100 range
      keyFindings: [
        'Normal vocal patterns detected',
        'Healthy breathing rate and pattern',
        'No significant anomalies identified',
        'Consider regular follow-up screenings'
      ]
    };
    
    // Generate recommendations
    const newRecommendations: Recommendation[] = [
      {
        action: 'Schedule follow-up screening in 6 months',
        impact: 'High',
        urgency: 'Low'
      },
      {
        action: 'Practice daily breathing exercises',
        impact: 'Medium',
        urgency: 'Medium'
      },
      {
        action: 'Monitor for any changes in voice quality',
        impact: 'Medium',
        urgency: 'Low'
      }
    ];
    
    setAssessment(newAssessment);
    setRecommendations(newRecommendations);
    
    // Move to results step
    setCurrentStep(2);
    setActiveTab('results');
  };

  // Reset the screening process
  const resetScreening = () => {
    setCurrentStep(0);
    setIsRecording(false);
    setCurrentTest(null);
    setTests(voiceTests.map(test => ({ ...test, completed: false })));
    setResults([]);
    setAssessment(null);
    setRecommendations([]);
    setActiveTab('record');
  };

  // Download report (mock function)
  const downloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your health report has been downloaded."
    });
  };

  // Get health risk level styling
  const getRiskLevelStyle = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        <title>Voice Analysis Screening | Scanova</title>
      </Helmet>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Advanced Voice Analysis Screening</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI technology analyzes your voice patterns to detect early signs of various health conditions. 
              This non-invasive screening can provide valuable insights into your respiratory health and more.
            </p>
          </motion.div>

          {/* Progress Tracker */}
          <div className="mb-8">
            <div className="flex justify-between max-w-3xl mx-auto mb-2">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`text-sm font-medium ${currentStep >= index ? 'text-cyan-600' : 'text-gray-400'}`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2 bg-gray-200 max-w-3xl mx-auto" />
          </div>

          {/* Main Content */}
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle>
                {steps[currentStep].title}
              </CardTitle>
              <CardDescription>
                {currentStep === 0 && "Provide basic information to personalize your screening experience."}
                {currentStep === 1 && "Complete the voice tests to analyze your vocal health."}
                {currentStep === 2 && "Review your voice analysis results and health assessment."}
                {currentStep === 3 && "Review personalized recommendations based on your results."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 0: Patient Information */}
              {currentStep === 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium mb-4">Getting Started</h3>
                    <p className="mb-4">
                      This screening will collect voice samples to analyze your vocal and respiratory health. 
                      You'll need a quiet environment and a working microphone.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 border border-cyan-200 rounded-lg bg-cyan-50">
                        <h4 className="font-medium text-cyan-800 mb-2">What to Expect</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          <li>A series of 6 voice tests (5-10 minutes total)</li>
                          <li>Real-time analysis of your voice patterns</li>
                          <li>Comprehensive health assessment report</li>
                          <li>Personalized recommendations</li>
                        </ul>
                      </div>
                      <div className="p-4 border border-cyan-200 rounded-lg bg-cyan-50">
                        <h4 className="font-medium text-cyan-800 mb-2">For Best Results</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          <li>Find a quiet room with minimal background noise</li>
                          <li>Speak at a normal volume and pace</li>
                          <li>Position yourself 6-12 inches from the microphone</li>
                          <li>Complete all tests in one session if possible</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex justify-end">
                    <Button 
                      onClick={() => {
                        setCurrentStep(1);
                        setActiveTab('record');
                      }}
                      className="bg-cyan-500 hover:bg-cyan-600 text-black"
                    >
                      Continue to Voice Tests <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 1: Voice Tests */}
              {currentStep === 1 && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="record">Record Tests</TabsTrigger>
                    <TabsTrigger value="completed">Completed Tests</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="record">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="mb-4">
                        <p>Complete the following voice tests. Each test analyzes different aspects of your vocal health.</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {results.length} of {tests.length} tests completed
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tests.map((test) => (
                          <motion.div 
                            key={test.id}
                            variants={itemVariants}
                            className={`border rounded-lg p-4 ${test.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
                          >
                            <h3 className="font-medium text-lg mb-2 flex items-center">
                              {test.name}
                              {test.completed && (
                                <span className="ml-2 text-green-600 text-sm bg-green-100 py-1 px-2 rounded-full">
                                  Completed
                                </span>
                              )}
                            </h3>
                            <p className="text-gray-600 mb-2">{test.instructions}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                              <span>Duration: {test.duration}</span>
                              <span>Metrics: {test.metrics.join(', ')}</span>
                            </div>
                            {test.completed ? (
                              <Button 
                                variant="outline" 
                                onClick={() => startRecording(test)}
                                className="w-full"
                              >
                                <PlayIcon className="h-4 w-4 mr-2" /> Retake Test
                              </Button>
                            ) : (
                              <Button 
                                onClick={() => startRecording(test)}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black"
                                disabled={isRecording}
                              >
                                {isRecording && currentTest?.id === test.id ? (
                                  <>
                                    <div className="animate-pulse flex items-center">
                                      <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                                      Recording...
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <MicIcon className="h-4 w-4 mr-2" /> Record Sample
                                  </>
                                )}
                              </Button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentStep(0)}
                        >
                          Back
                        </Button>
                        
                        <Button 
                          onClick={generateAssessment}
                          className="bg-cyan-500 hover:bg-cyan-600"
                          disabled={results.length < 3}
                        >
                          {results.length < 3 ? (
                            'Complete at least 3 tests'
                          ) : (
                            'Generate Assessment'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {results.length > 0 ? (
                        <>
                          <h3 className="font-medium text-lg mb-4">Completed Test Results</h3>
                          <div className="space-y-4">
                            {results.map((result) => {
                              const test = tests.find(t => t.id === result.testId);
                              return (
                                <motion.div 
                                  key={result.id}
                                  variants={itemVariants}
                                  className="border border-gray-200 rounded-lg p-4"
                                >
                                  <h4 className="font-medium">{test?.name}</h4>
                                  <p className="text-sm text-gray-500 mb-2">
                                    Recorded on {new Date(result.timestamp).toLocaleString()}
                                  </p>
                                  <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="bg-cyan-50 p-3 rounded-lg text-center">
                                      <p className="text-sm text-gray-600">Vocal Stability</p>
                                      <p className="text-xl font-medium text-cyan-700">{result.vocalStability}%</p>
                                    </div>
                                    <div className="bg-cyan-50 p-3 rounded-lg text-center">
                                      <p className="text-sm text-gray-600">Breathing Rate</p>
                                      <p className="text-xl font-medium text-cyan-700">{result.breathingRate} bpm</p>
                                    </div>
                                    <div className="bg-cyan-50 p-3 rounded-lg text-center">
                                      <p className="text-sm text-gray-600">Duration</p>
                                      <p className="text-xl font-medium text-cyan-700">{result.duration}s</p>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-5xl text-gray-300 mb-4">
                            <MicIcon className="h-12 w-12 mx-auto" />
                          </div>
                          <h3 className="text-xl font-medium text-gray-700 mb-2">No Tests Completed</h3>
                          <p className="text-gray-500 mb-4">Complete voice tests to see your results here.</p>
                          <Button 
                            variant="outline"
                            onClick={() => setActiveTab('record')}
                          >
                            Go to Test Recording
                          </Button>
                        </div>
                      )}

                      <div className="mt-8 flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab('record')}
                        >
                          Back to Tests
                        </Button>
                        
                        <Button 
                          onClick={generateAssessment}
                          className="bg-cyan-500 hover:bg-cyan-600"
                          disabled={results.length < 3}
                        >
                          {results.length < 3 ? (
                            'Complete at least 3 tests'
                          ) : (
                            'Generate Assessment'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              )}

              {/* Step 2: Analysis Results */}
              {currentStep === 2 && assessment && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="results">Overview</TabsTrigger>
                      <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
                      <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="results">
                      <motion.div variants={itemVariants} className="mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="md:w-1/2">
                            <h3 className="text-xl font-medium mb-4">Health Assessment</h3>
                            <div className="flex items-center mb-2">
                              <div className="w-32 font-medium">Overall Score:</div>
                              <div className="flex-1">
                                <Progress value={assessment.overallScore} className="h-3 bg-gray-200" />
                              </div>
                              <div className="ml-4 font-bold">{assessment.overallScore}%</div>
                            </div>
                            <div className="flex items-center mb-2">
                              <div className="w-32 font-medium">Risk Level:</div>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelStyle(assessment.riskLevel)}`}>
                                {assessment.riskLevel}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-32 font-medium">Confidence:</div>
                              <div className="flex-1">
                                <Progress value={assessment.confidence} className="h-3 bg-gray-200" />
                              </div>
                              <div className="ml-4 font-bold">{assessment.confidence}%</div>
                            </div>
                          </div>
                          
                          <div className="md:w-2/5 mt-6 md:mt-0">
                            <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                              <h4 className="font-medium text-cyan-800 mb-2">Key Findings</h4>
                              <ul className="space-y-2">
                                {assessment.keyFindings.map((finding, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="text-cyan-500 mr-2">•</div>
                                    <div>{finding}</div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <Separator className="my-6" />
                      
                      <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-medium mb-4">Test Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center text-cyan-500 mb-2">
                              <HeartPulseIcon className="h-5 w-5 mr-2" />
                              <h4 className="font-medium">Respiratory Health</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Your breathing pattern analysis indicates normal respiratory function with a healthy breathing rate.</p>
                          </div>
                          
                          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center text-cyan-500 mb-2">
                              <ActivityIcon className="h-5 w-5 mr-2" />
                              <h4 className="font-medium">Vocal Stability</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Your voice samples show good stability and control, which is typically associated with healthy vocal cords.</p>
                          </div>
                          
                          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center text-cyan-500 mb-2">
                              <BrainIcon className="h-5 w-5 mr-2" />
                              <h4 className="font-medium">Neurological Indicators</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Speech patterns and articulation tests show no significant anomalies associated with neurological conditions.</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>
                          Back to Tests
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            setCurrentStep(3);
                            setActiveTab('recommendations');
                          }}
                          className="bg-cyan-500 hover:bg-cyan-600"
                        >
                          View Recommendations
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details">
                      <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-medium mb-4">Detailed Voice Analysis</h3>
                        
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-700 mb-2">Voice Patterns</h4>
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 h-64 flex items-center justify-center">
                            <p className="text-gray-500">Voice pattern visualization would appear here.</p>
                            {/* In a real app, this would display an actual chart */}
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-700 mb-2">Frequency Analysis</h4>
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 h-64 flex items-center justify-center">
                            <p className="text-gray-500">Frequency analysis visualization would appear here.</p>
                            {/* In a real app, this would display an actual chart */}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Anomaly Detection</h4>
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center text-green-500 mb-2">
                              <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              </div>
                              <p>No significant anomalies detected</p>
                            </div>
                            <p className="text-gray-600 text-sm">
                              Our analysis did not identify any significant anomalies in your voice patterns that would indicate potential health concerns. Continue with regular screenings to monitor your health over time.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab('results')}>
                          Back to Overview
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            setCurrentStep(3);
                            setActiveTab('recommendations');
                          }}
                          className="bg-cyan-500 hover:bg-cyan-600"
                        >
                          View Recommendations
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="metrics">
                      <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-medium mb-4">Health Metrics</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-4">Average Metrics</h4>
                            
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Vocal Stability</span>
                                  <span className="text-sm font-medium">
                                    {results.reduce((sum, r) => sum + r.vocalStability, 0) / results.length}%
                                  </span>
                                </div>
                                <Progress 
                                  value={results.reduce((sum, r) => sum + r.vocalStability, 0) / results.length} 
                                  className="h-2 bg-gray-200" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Breathing Rate</span>
                                  <span className="text-sm font-medium">
                                    {(results.reduce((sum, r) => sum + r.breathingRate, 0) / results.length).toFixed(1)} bpm
                                  </span>
                                </div>
                                <Progress 
                                  value={(results.reduce((sum, r) => sum + r.breathingRate, 0) / results.length) * 5} 
                                  className="h-2 bg-gray-200" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Duration Capability</span>
                                  <span className="text-sm font-medium">
                                    {(results.reduce((sum, r) => sum + r.duration, 0) / results.length).toFixed(1)}s
                                  </span>
                                </div>
                                <Progress 
                                  value={(results.reduce((sum, r) => sum + r.duration, 0) / results.length) * 5} 
                                  className="h-2 bg-gray-200" 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-4">Comparison to Baseline</h4>
                            
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <div className="w-1/3">
                                  <p className="text-sm font-medium">Your Score</p>
                                  <p className="text-2xl font-bold text-cyan-600">{assessment.overallScore}%</p>
                                </div>
                                <div className="w-1/3 border-l border-r px-4 text-center">
                                  <p className="text-sm font-medium">Average</p>
                                  <p className="text-2xl font-bold text-gray-600">78%</p>
                                </div>
                                <div className="w-1/3 pl-4 text-right">
                                  <p className="text-sm font-medium">Difference</p>
                                  <p className="text-2xl font-bold text-green-600">+{assessment.overallScore - 78}%</p>
                                </div>
                              </div>
                              
                              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-800">
                                  <span className="font-medium">Insight:</span> Your voice health metrics are above average, indicating good respiratory and vocal health.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-700 mb-4">Test-by-Test Comparison</h4>
                          
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vocal Stability</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breathing Rate</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {results.map((result, index) => {
                                  const test = tests.find(t => t.id === result.testId);
                                  return (
                                    <tr key={result.id}>
                                      <td className="px-4 py-3 text-sm text-gray-900">{test?.name}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{result.vocalStability}%</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{result.breathingRate} bpm</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{result.duration}s</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab('results')}>
                          Back to Overview
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            setCurrentStep(3);
                            setActiveTab('recommendations');
                          }}
                          className="bg-cyan-500 hover:bg-cyan-600"
                        >
                          View Recommendations
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}

              {/* Step 3: Recommendations */}
              {currentStep === 3 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-medium mb-4">Personalized Recommendations</h3>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-3">Primary Actions</h4>
                      <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-medium">{rec.action}</p>
                                <div className="flex mt-2 space-x-3">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    rec.impact === 'High' ? 'bg-blue-100 text-blue-800' :
                                    rec.impact === 'Medium' ? 'bg-indigo-100 text-indigo-800' : 
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    Impact: {rec.impact}
                                  </span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    rec.urgency === 'High' ? 'bg-red-100 text-red-800' :
                                    rec.urgency === 'Medium' ? 'bg-orange-100 text-orange-800' : 
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    Urgency: {rec.urgency}
                                  </span>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="text-cyan-500">
                                <ChevronRightIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">Medical Recommendations</h4>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="text-cyan-500 mr-2">•</div>
                              <div>Schedule a regular check-up with your primary care physician</div>
                            </li>
                            <li className="flex items-start">
                              <div className="text-cyan-500 mr-2">•</div>
                              <div>Consider a pulmonary function test for baseline measurement</div>
                            </li>
                            <li className="flex items-start">
                              <div className="text-cyan-500 mr-2">•</div>
                              <div>Repeat this voice screening in 6 months to track changes</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">Lifestyle Recommendations</h4>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="text-cyan-500 mr-2">•</div>
                              <div>Practice daily breathing exercises to maintain respiratory health</div>
                            </li>
                            <li className="flex items-start">
                              <div className="text-cyan-500 mr-2">•</div>
                              <div>Stay hydrated to maintain healthy vocal cords</div>
                            </li>
                            <li className="flex items-start">
                              <div className="text-cyan-500 mr-2">•</div>
                              <div>Avoid excessive vocal strain and practice good vocal hygiene</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-3">Follow-up Plan</h4>
                      <div className="border border-gray-200 rounded-lg p-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Next Appointment</p>
                            <p className="font-medium">6 months from now</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tests Required</p>
                            <p className="font-medium">Voice Analysis, Breathing Test</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Monitoring Plan</p>
                            <p className="font-medium">Biannual Screening</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <Separator className="my-6" />
                  
                  <motion.div variants={itemVariants}>
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <div className="mb-4 sm:mb-0">
                        <h4 className="font-medium text-gray-700">Report Options</h4>
                        <p className="text-sm text-gray-500">Save or share your results</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          onClick={downloadReport}
                          className="bg-cyan-500 hover:bg-cyan-600"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" /> Download PDF
                        </Button>
                        
                        <Button variant="outline">
                          <FileTextIcon className="h-4 w-4 mr-2" /> Email Report
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back to Results
                    </Button>
                    
                    <Button onClick={resetScreening}>
                      Start New Screening
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
          
          {/* Disclaimer */}
          <motion.div
            className="max-w-3xl mx-auto mt-8 text-sm text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p>
              <AlertTriangleIcon className="h-4 w-4 inline-block mr-1" />
              Disclaimer: This screening tool is not a substitute for professional medical advice, diagnosis, or treatment.
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VocalAnalysisPage;