import { useState, useCallback, useRef } from "react";
import QUESTIONS from '../questions.js';
import imgTrophy from '../assets/quiz-complete.png'
import Question from "./Quesiton.jsx";

export default function Quiz(){
    const [ answerState, setAnswerState ] = useState('');
    const [ userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length -1;
    const quizCompleted = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer){
        setAnswerState('answered')
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        });

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct')
            } else{
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000);
            
        }, 1000)
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizCompleted){
        return( <div id="summary">
            <img src={imgTrophy} alt="Trophy" />
            <h2>Quiz Completed!</h2>
        </div>
    )}
    
    return(
        <>
        <div id="quiz">
            <Question 
            key={activeQuestionIndex}
            questionTetx={QUESTIONS[activeQuestionIndex].text} 
            answers={QUESTIONS[activeQuestionIndex].answers}
            answerState={answerState}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            onSlectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
            />
        </div>
      </>  
    );
}