import { useState } from "react";
import QUESTIONS from '../questions.js';

export default function Quiz(){
    const [ userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    //ABAIXO
    //Criando uma forma de embaralhar as respostas, pois a primeira sempre será a correta, com isso vou fazer com que seja embaralhada com as demais. 
    //Claro que apenas ao usuário, por isso foi criado a array desta constante abaixo, para que não altere o array inicial.
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() -0.5)

    function handleSelectAnswer (selectedAnswer){
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        });
    };

    return(
      <>
        <div id="quiz">
            <div id="questions">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => 
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>) }
                </ul>
            </div>
        </div>
      </>  
    );
}