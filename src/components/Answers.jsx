import { useRef } from "react";

export default function Answeres({answers, selectedAnswer, answerState, onSelect}){
    const shuffledAnswers = useRef();    
    //ABAIXO
    //Criando uma forma de embaralhar as respostas, pois a primeira sempre será a correta, com isso vou fazer com que seja embaralhada com as demais. 
    //Claro que apenas ao usuário, por isso foi criado a array desta constante abaixo, para que não altere o array inicial.
    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() -0.5)
    }

    return(
        <ul id="answers">
                    {shuffledAnswers.current.map(answer => {
                        const isSelected = selectedAnswer === answer;
                        let cssClass = '';
                        if(answerState === 'answered' && isSelected){
                            cssClass= 'selected'
                        }

                        if(answerState === 'correct' || answerState === 'wrong' && isSelected){
                          cssClass = answerState;  
                        }

                        return(
                        <li key={answer} className="answer">
                            <button onClick={() => onSelect(answer)} className={cssClass}>
                                {answer}
                            </button>
                        </li>)}
                    )}
        </ul>

    
)}