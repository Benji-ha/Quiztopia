

  export interface Location {
    longitude: string;
    latitude: string;
  }

  export interface Question {
    question: string;
    answer: string;
    location: Location;
  }

  export interface QuizResponse {
    questions: Question[];
    userId: string;
    quizId: string;
  }