import QuestionItem from "./QuestionItem";
import "./question_list.css";

export default function QuestionList({ questions }) {
  if (!questions || !Array.isArray(questions)) {
    return (
      <div className="questions-list questions-list--empty">
        <p className="questions-empty-text">Нет данных</p>
      </div>
    );
  }

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
      {questions.map(({id, title, shortAnswer, complexity, rate, imgSrc}) => (
        <QuestionItem
          key={id}
          title={title}
          content={shortAnswer}
          complexity={complexity}
          rate={rate}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}
