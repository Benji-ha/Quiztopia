import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuizName = () => {
  const [quizName, setQuizName] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateQuiz = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setMessage("You need to be logged in to create a quiz.");
      return;
    }

    console.log('Token:', token);
    console.log('Request Body:', JSON.stringify({ name: quizName }));

    try {
      const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: quizName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from API:', errorData);
        throw new Error('Failed to create quiz.');
      }

      const quizData = await response.json();
      console.log('Quiz created:', quizData);

      navigate(`/add-quiz-questions/${quizName}`);
    } catch (error: any) {
      console.error('Error during quiz creation:', error);
      setMessage("Something went wrong while creating the quiz. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>
      <input
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
      />
      <button onClick={handleCreateQuiz}>Create Quiz</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateQuizName;
