export type MentalHealthCondition =
  | 'Anxiety'
  | 'BPD'
  | 'autism'
  | 'bipolar'
  | 'depression'
  | 'mentalhealth'
  | 'schizophrenia';

export interface PredictionResponse {
  text: string;
  predicted_subreddit: string;
  confidence: number;
  timestamp: string;
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  prediction?: {
    condition: string;
    confidence: number;
  };
}
