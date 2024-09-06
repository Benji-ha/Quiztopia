import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import MissionControl from './Pages/MissionControl/MissionControl'
import CreateQuizName from './Pages/CreateQuizName/CreateQuizName'
import AddQuizQuestions from './Pages/AddQuizQuestions/AddQuizQuestions'
import ViewQuiz from './Pages/ViewQuiz/ViewQuiz'

function App() {


  return (

    <div className='App'>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mission-control" element={<MissionControl />} />
        <Route path="/create-quiz-name" element={<CreateQuizName />} />
        <Route path="/add-quiz-questions/:quizName" element={<AddQuizQuestions />} />
        <Route path='/view-quizzes' element={<ViewQuiz />} />

      </Routes>
    </div>

  )
}

export default App
