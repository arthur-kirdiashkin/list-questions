import { useEffect, useRef, useState } from "react";
import "./question_answer.css";
import arrowDown from "../../assets/arrow_down.png";
import arrowUp from "../../assets/arrow_upp.png";

export default function QuestionAnswer({ title, answer }) {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.scrollHeight);
  }, [answer]);

  const [isActive, setIsActive] = useState(false);

  const onQuestionClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <section className="question-answer">
      <h2 className="question-answer__title">{title}</h2>
      <div
        ref={ref}
        className={
          height >= 693 && !isActive
            ? "question-answer__desc short"
            : "question-answer__desc"
        }
        dangerouslySetInnerHTML={{ __html: answer }}
      />
      {height >= 693 && (
        <button onClick={onQuestionClick} className="question-answer__btn">
          <span className="question-answer__text">
            {isActive ? "Свернуть" : "Развернуть"}
          </span>
          <img src={isActive ? arrowUp : arrowDown} alt="" />
        </button>
      )}
    </section>
  );
}
