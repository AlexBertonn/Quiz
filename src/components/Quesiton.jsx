import QuestionTimer from "./QuestionTimer"
import Answeres from "./Answers"

export default function Question({questionTetx, answers, onSlectAnswer, selectedAnswer, answerState, onSkipAnswer}){
    return(
        <div id="questions">
                <QuestionTimer 
                    timeout={10000} 
                    onTimeout={onSkipAnswer}
                />

                <h2>{questionTetx}</h2>
                <Answeres 
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                    answerState={answerState}
                    onSelect={onSlectAnswer}
                />
            </div>
    )
}