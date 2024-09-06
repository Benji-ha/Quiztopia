import { useNavigate } from 'react-router-dom';
import './MissionControl.css';

export default function MissionControl() {
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate('/create-quiz-name'); 
  };

  const handleViewQuizzes = () => {
    navigate('/view-quizzes'); 
  };

  return (
    <div>
      <h1 className='MissionControl-header'>Mission Control</h1>
      <button className='MissionControl-Button' onClick={handleCreateQuiz}>Create a Quiz</button>
      <button className='MissionControl-Button'  onClick={handleViewQuizzes}>View Current Quizzes</button>
    </div>
  );
}
