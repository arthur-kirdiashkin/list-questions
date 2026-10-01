import "./question_item.css";

import arrowDown from "./../../assets/arrow_down.png";
import arrowUpp from "./../../assets/arrow_upp.png";
import QuestionMetric from "../question_metric/QuestionMetric";
import { useState } from "react";

export default function QuestionItem({
  title,
  content,
  rate,
  complexity,
  imgSrc,
}) {
  const [isActive, setIsActive] = useState(false);

  const onQuestionClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="question-item" key={title}>
      <div className="question-content" onClick={onQuestionClick}>
        <div className="question">
          <div className="question-circle"></div>
          <div className="question-title">{title}</div>
        </div>
        <div>
          {isActive ? (
            <img src={arrowDown} alt="Стрелка вниз" />
          ) : (
            <img src={arrowUpp} alt="Стрелка вверх" />
          )}
        </div>
      </div>
      {isActive && (
        <div className="question-desc">
          <div className="question-info">
            <QuestionMetric label="Рейтинг" value={rate} />
            <QuestionMetric label="Сложность" value={complexity} />
          </div>
          {imgSrc && (
            <div className="question-image">
              <img src={imgSrc} alt="Иллюстрация к вопросу" />
            </div>
          )}
          <div
            className="question-text"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      )}
    </div>
  );
}
