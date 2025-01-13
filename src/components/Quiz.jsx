import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import imgTrophy from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

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

    //ABAIXO
    //Criando uma forma de embaralhar as respostas, pois a primeira sempre será a correta, com isso vou fazer com que seja embaralhada com as demais. 
    //Claro que apenas ao usuário, por isso foi criado a array desta constante abaixo, para que não altere o array inicial.
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() -0.5)
    
    return(
        <>
        <div id="quiz">
            <div id="questions">
                <QuestionTimer 
                    key={activeQuestionIndex} 
                    timeout={10000} 
                    onTimeout={handleSkipAnswer}
                />

                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => {
                        const isSelected = userAnswers[userAnswers.length -1] === answer;
                        let cssClass = '';
                        if(answerState === 'answered' && isSelected){
                            cssClass= 'selected'
                        }

                        if(answerState === 'correct' || answerState === 'wrong' && isSelected){
                          cssClass = answerState;  
                        }

                        return(
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                                {answer}
                            </button>
                        </li>)}
                    )}
                </ul>
            </div>
        </div>
      </>  
    );
}