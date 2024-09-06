import { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizMap from '../../Components/QuizMap/QuizMap';
import { LatLngExpression } from 'leaflet';



const AddQuizQuestions = () => {
  const { quizName } = useParams<{ quizName: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression | null>(null);
  const [tempMarker, setTempMarker] = useState<LatLngExpression | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
asdasdasd
  const handleMapClick = (latLng: { lat: number; lng: number }) => {
    const newLocation: LatLngExpression = [latLng.lat, latLng.lng];
    setCurrentLocation(newLocation);
    setTempMarker(newLocation);
  };

  const handleAddQuestionClick = () => {
    if (currentQuestion && currentAnswer && currentLocation) {

      setQuestions([...questions, { text: currentQuestion, answer: currentAnswer, location: currentLocation }]);

      setCurrentQuestion('');
      setCurrentAnswer('');
      setCurrentLocation(null);
      setTempMarker(null);
      setMessage(null);
    } else {
      setMessage("Please provide a question, an answer, and click on the map to select a location.");
    }
  };

  const handleSaveQuestions = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setMessage("You need to be logged in to save questions.");
      return;
    }

    try {
      for (const question of questions) {
        await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: quizName,
            question: question.text,
            answer: question.answer,
            location: {
              longitude: question.location[1].toString(),
              latitude: question.location[0].toString(),
            },
          }),
        });
      }

      setMessage("All questions saved successfully!");
    } catch (error: any) {
      console.error('Error during question addition:', error);
      setMessage("Failed to add questions to the quiz.");
    }
  };

  return (
    <div>
      <h1>Add Questions to Quiz: {quizName}</h1>
      <input
        type="text"
        placeholder="Question"
        value={currentQuestion}
        onChange={(e) => setCurrentQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
      />
      <button onClick={handleAddQuestionClick}>Add Question</button>
      {message && <p>{message}</p>}
      <button onClick={handleSaveQuestions}>Save All Questions</button>


      <QuizMap 
        onMapClick={handleMapClick} 
        quizzes={[
          ...questions.map(q => ({ 
            question: q.text, 
            answer: q.answer, 
            location: { latitude: q.location[0].toString(), longitude: q.location[1].toString() } 
          })),
          ...(tempMarker ? [{
            question: "Temporary Question",
            answer: "Temporary Answer",
            location: { latitude: tempMarker[0].toString(), longitude: tempMarker[1].toString() }
          }] : [])
        ]}
      />
    </div>
  );
};

export default AddQuizQuestions;
