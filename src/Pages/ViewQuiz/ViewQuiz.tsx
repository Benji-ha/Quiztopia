import { useEffect, useState } from 'react';
import { Quiz, QuizListResponse } from "../../quiz.d";
import QuizMap from '../../Components/QuizMap/QuizMap';
import './ViewQuiz.css';
const ViewQuizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchQuizzes = async () => {

        try {

          const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data: QuizListResponse = await response.json();
          setQuizzes(data.quizzes);

          // console.log(data);

        } catch (error: any) {
          setError(error.message);
        }
      };
  
      fetchQuizzes();
    }, []);
  
    const handleQuizClick = (quiz: Quiz) => {
      setSelectedQuiz(quiz);
    };
  
    if (error) return <div>Error: {error}</div>;
  
    return (

      <div>
        {selectedQuiz ? (
          <>
            <h1>{selectedQuiz.quizId}</h1>
            <h2>Created by User: {selectedQuiz.username}</h2>
            <QuizMap quizzes={selectedQuiz.questions} />
            <button className='Back-Button' onClick={() => setSelectedQuiz(null)}>Back to Quiz List</button>
          </>
        ) : (
          <>
            <h1>Available Quizzes</h1>
            <ul className='Quiz-list'>
              {quizzes.map((quiz, index) => (
                <li className='Quiz-box' key={index}>
                  <h2>{quiz.quizId}</h2>
                  <p>Created by User: {quiz.username}</p>
                  <button className='View-Button' onClick={() => handleQuizClick(quiz)}>View</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };
export default ViewQuizzes;
