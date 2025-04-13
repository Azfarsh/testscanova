
export interface FileInput {
  accept: string;
  multiple: boolean;
  maxSize: number; // in MB
}

export interface AudioInput {
  maxDuration: number; // in seconds
  sampleRate: number;
  channels: number;
}

export interface ServiceInput {
  type: 'file' | 'audio' | 'text';
  fileConfig?: FileInput;
  audioConfig?: AudioInput;
  validation?: {
    required: boolean;
    maxLength?: number;
  };
}

export interface Service {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  input: ServiceInput;
}
