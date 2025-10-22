import React, { useState } from 'react';
import questions from './questions.json';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleCheckClick = () => {
    if (selectedOption !== null) {
      const correct = selectedOption === currentQuestion.answer;
      setIsCorrect(correct);
      setIsAnswered(true);
    }
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const getButtonClassName = (option) => {
    if (!isAnswered) {
      return selectedOption === option ? 'option-button selected' : 'option-button';
    }
    if (option === currentQuestion.answer) {
      return 'option-button correct';
    }
    if (option === selectedOption) {
      return 'option-button incorrect';
    }
    return 'option-button';
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <h1>Duolingo Clone</h1>
        {currentQuestionIndex < questions.length ? (
          <div>
            <h2>{currentQuestion.question}</h2>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={getButtonClassName(option)}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="action-container">
              {isAnswered ? (
                <button onClick={handleNextClick} className="action-button">
                  Tiếp theo
                </button>
              ) : (
                <button
                  onClick={handleCheckClick}
                  disabled={selectedOption === null}
                  className="action-button"
                >
                  Kiểm tra
                </button>
              )}
            </div>
            {isAnswered && (
              <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                {isCorrect ? 'Chính xác!' : 'Không đúng!'}
              </div>
            )}
          </div>
        ) : (
          <h2>Bạn đã hoàn thành bài học!</h2>
        )}
      </div>
    </div>
  );
}

export default App;
