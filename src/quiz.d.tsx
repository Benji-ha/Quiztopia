
export interface Location {
  longitude: string;
  latitude: string;
}


export interface Question {
  question: string;
  answer: string;
  location: Location;
}


export interface Quiz {
  quizId: string;
  userId: string;
  username: string;
  questions: Question[];
}


export interface QuizListResponse {
  quizzes: Quiz[];  
}
