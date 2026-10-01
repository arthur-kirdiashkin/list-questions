import QuestionItem from "./QuestionItem";
import "./question_list.css";

export default function QuestionList({ questions }) {
  if (questions.length === 0) {
    return (
      <div className="questions-list questions-list--empty">
        <p className="questions-empty-text">
          По выбранным фильтрам ничего не найдено
        </p>
      </div>
    );
  }

  return (
    <div className="questions-list">
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          title={question.title}
          content={question.shortAnswer}
          complexity={question.complexity}
          rate={question.rate}
          imgSrc={question.imgSrc}
        />
      ))}
    </div>
  );
}
