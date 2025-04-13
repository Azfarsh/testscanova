// User types
export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: string;
}

// Doctor types
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  isAvailable: boolean;
  rating: number;
  reviews: number;
  education: string;
  experience: string;
  languages: string[];
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  howItWorksTitle: string;
  steps?: string[];
  features?: string[];
  duration: string;
  rating: number;
  reviews: number;
  actionText: string;
  actionLink: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

// Medical Record types
export interface MedicalRecord {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  icon: string;
  type: string;
  typeBadgeColor: string;
  date: string;
  source: string;
  url: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
}

// Health Metrics types
export interface HealthMetric {
  day: string;
  bloodPressure: number;
  heartRate: number;
  sleepQuality: number;
  activityLevel: number;
}

// Screening Result types
export interface ScreeningResult {
  id: number;
  type: string;
  icon: string;
  date: string;
  result: string;
  resultType: 'success' | 'warning' | 'danger';
  confidence: string;
}
