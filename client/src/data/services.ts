import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Voice-Based Health Check-up',
    description: 'Our AI technology can detect early signs of Parkinson\'s disease and other neurological conditions by analyzing your voice patterns. This non-invasive screening helps catch issues before traditional symptoms appear.',
    category: 'Voice Analysis',
    image: 'https://augnito.ai/resources/wp-content/uploads/2023/10/Voice-AI-for-mental-health-e1698229559889-1200x900.jpg',
    howItWorksTitle: 'How it works',
    steps: [
      'Record a voice sample reading a provided text passage',
      'Our AI analyzes speech patterns, tremors, and vocal characteristics',
      'Receive results with confidence scores and recommendations',
      'Share results with your doctor for further evaluation if needed'
    ],
    duration: 'Takes approximately 5 minutes',
    rating: 4.8,
    reviews: 125,
    actionText: 'Start Screening',
    actionLink: '/services/voice-screening'
  },
  {
    id: '2',
    title: 'Image-Based Disease Detection',
    description: 'Upload medical images such as X-rays, skin photos, or retinal scans for AI-powered analysis. Our technology can detect signs of conditions including skin cancer, lung abnormalities, and tuberculosis.',
    category: 'Image Screening',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    howItWorksTitle: 'Supported screenings',
    features: [
      'Skin lesion analysis (melanoma detection)',
      'Chest X-ray screening (pneumonia, TB)',
      'Retinal scan analysis (diabetic retinopathy)'
    ],
    duration: 'Results in 1-2 minutes',
    rating: 4.9,
    reviews: 210,
    actionText: 'Upload Image',
    actionLink: '/services/image-screening'
  },
  {
    id: '3',
    title: 'Health Monitoring Dashboard',
    description: 'Track and visualize your health metrics over time with our comprehensive dashboard. Monitor vital signs, lifestyle factors, and screening results all in one place for a complete picture of your health.',
    category: 'Health Monitoring',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    howItWorksTitle: 'What you can track',
    features: [
      'Vital signs and biometrics',
      'Medication adherence',
      'Lifestyle factors (sleep, activity, nutrition)',
      'Screening results and trends'
    ],
    duration: 'Real-time updates',
    rating: 4.7,
    reviews: 98,
    actionText: 'View Dashboard',
    actionLink: '/dashboard'
  },
  {
    id: '4',
    title: 'Cognitive Health Assessment',
    description: 'Assess cognitive function through interactive tests designed to evaluate memory, attention, reasoning, and other cognitive domains. Early detection of cognitive changes can lead to timely interventions.',
    category: 'Voice Analysis',
    image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    howItWorksTitle: 'Assessment includes',
    steps: [
      'Complete a series of interactive cognitive tasks (15-20 minutes)',
      'AI analyzes performance across multiple cognitive domains',
      'Receive a comprehensive report with domain-specific scores',
      'Track changes over time and get personalized recommendations'
    ],
    duration: 'Takes 15-20 minutes',
    rating: 4.6,
    reviews: 87,
    actionText: 'Start Assessment',
    actionLink: '/services/cognitive-assessment'
  },
  {
    id: '5',
    title: 'Secure Records Management',
    description: 'Store, organize, and securely share your medical records with healthcare providers. Our encrypted platform ensures your sensitive health information remains protected while being accessible when needed.',
    category: 'Medical Records',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    howItWorksTitle: 'Features include',
    features: [
      'End-to-end encryption for all documents',
      'Organize records by type, date, or provider',
      'Secure sharing with healthcare professionals',
      'Document scanning and automatic categorization'
    ],
    duration: 'Instant access',
    rating: 4.8,
    reviews: 156,
    actionText: 'Manage Records',
    actionLink: '/records'
  },
  {
    id: '6',
    title: 'Sleep Quality Analysis',
    description: 'Analyze your sleep patterns using voice recordings of your breathing during sleep. Our AI can detect signs of sleep apnea and other sleep disorders, helping you improve your rest and overall health.',
    category: 'Voice Analysis',
    image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    howItWorksTitle: 'How it works',
    steps: [
      'Place your device near your bed to record breathing sounds during sleep',
      'Our AI analyzes breathing patterns, snoring, and other sleep sounds',
      'Receive a detailed sleep quality report with potential issues identified',
      'Get personalized recommendations to improve sleep quality'
    ],
    duration: 'Overnight recording (6-8 hours)',
    rating: 4.5,
    reviews: 72,
    actionText: 'Analyze Sleep',
    actionLink: '/services/sleep-analysis'
  }
];
