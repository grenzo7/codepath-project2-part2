import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'

const questions = [
  {
    text: "What is the highest peak of the world?",
    answer: "Mount Everest",
    difficulty: 'easy'
  },
  {
    text: "Which is the biggest country in the world?",
    answer: "Russia",
    difficulty: 'easy'

  },
  {
    text: "Who is the vice president of the USA?",
    answer: "Kamala Harris",
    difficulty: 'medium'

  },
  {
    text: "Is Pendrive a storage device?",
    answer: "Yes",
    difficulty: 'medium'
  },
  {
    text: "How many bits make 1 byte?",
    answer: "8 bits",
    difficulty: 'hard'

  },
  {
    text: "What is the full form of RAM?",
    answer: "Random Access Memory",
    difficulty: 'hard'

  },
  {
    text: "Is Printer an example of output device?",
    answer: "Yes",
    difficulty: 'easy'

  },
  {
    text: "Which electronic component was used in first generation of computer?",
    answer: "Vacuum Tubes",
    difficulty: 'hard'

  },
  {
    text: "What is the full form of UN?",
    answer: "United Nations",
    difficulty: 'easy'

  },
  {
    text: "When was IBM Computer invented?",
    answer: "August 12, 1981",
    difficulty: 'hard'
  }
]

const App = () => {
  const [index, setIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userGuess, setUserGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  useEffect(() => {
    // Reset current streak and longest streak when index changes
    setLongestStreak(Math.max(currentStreak, longestStreak))
  }, [index])



  const toggleQuestionAnswer = () => {
    const questionBox = document.querySelector('.question-box');
    questionBox.classList.toggle('show-answer');
    setShowAnswer(!showAnswer);
  };
  
  

  const updateQuestionNum = () => {
    setIndex((index + 1) % questions.length)
    setShowAnswer(false)
    setFeedback('')
  }

  const handleUserGuess = (e) => {
    setUserGuess(e.target.value)
  }

  
  const shuffleCards = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setIndex(randomIndex);
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
    setCurrentStreak(0);
  };
  const handleUserSubmit = () => {
    if (userGuess.toLowerCase().trim() === questions[index].answer.toLowerCase().trim() ) {
      setFeedback(<p className="correct-feedback">Correct!</p>)
      setCurrentStreak(currentStreak + 1)
      setLongestStreak(Math.max(currentStreak + 1, longestStreak))
      setUserGuess('')
      if (index === questions.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }

    } else {
      setFeedback(<p className="incorrect-feedback">Incorrect, try again.</p>)
      setCurrentStreak(0)
      setUserGuess('')
    }
  }




  const colorDict = {
    easy: 'green',
    medium: 'yellow',
    hard: 'red'
  }

  const currentQuestion = questions[index]


  return (
    <div className='wholebody'>
      <Header />
      {feedback && 
        <h2 className='feedback-text'>{feedback}</h2>
      }
      <div className='question-container'>
      <button className='shuffle-button' onClick={shuffleCards}>Shuffle</button>
        <div className='question-box' style={{backgroundColor: colorDict[currentQuestion.difficulty]}} onClick={toggleQuestionAnswer}>
          {!showAnswer && 
            <h1 className='question-text'>{currentQuestion.text}</h1>}
          {showAnswer && 
            <h1 className='answer-text'>{currentQuestion.answer}</h1>
          }
        </div>
        <div className='guess-container'>
          <input type='text' value={userGuess} onChange={handleUserGuess} placeholder='Enter your guess...' className='guess-input' />
          <button className='button guess-button' onClick={handleUserSubmit}>Submit</button>
        </div>
      </div>
      <div className='button-container'>
        {index > 0 &&
          <button className='button' onClick={() => setIndex(index - 1)}>⬅️</button>
        }
        <button className='button' onClick={updateQuestionNum}>➡️</button>
      </div>
      <div className='streak-counter-container'>
        <h3>Current streak: {currentStreak}</h3>
        <h3>Longest streak: {longestStreak}</h3>
      </div> 
    </div>
  )}
  
  export default App
