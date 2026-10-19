import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuestion } from "../../api/requests";
import "../../components/question_layout/question_layout.css";
import questionImg from "../../assets/question_img.svg";
import "./question_page.css";
import Spinner from "../../components/spinner/Spinner";
import altArrowLeft from "../../assets/alt_arrow_left.svg";
import altArrowRight from "../../assets/alt_arrow_right.svg";
import QuestionAnswer from "../../components/question_answer/QuestionAnswer";
import caretLeft from "../../assets/caret_left.svg";
import showFilter from "../../assets/show_filter.svg";
import QuestionSidebar from "../../components/question_sidebar/QuestionSidebar";

export default function QuestionPage() {
  const { questionId } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const questions = location.state?.questions || [];

  const currentId = Number(questionId);

  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const data = await getQuestion(currentId);

        console.log(data);

        setQuestion(data || []);
      } catch (error) {
        console.error("Ошибка при загрузке вопроса:", error);
        setQuestion({});
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [currentId]);

  const handleNext = () => {
    const currentIndex = questions.findIndex(
      (ques) => Number(ques.id) === currentId,
    );
    if (currentIndex !== -1) {
      const nextId = questions[currentIndex + 1].id;
      navigate(`/questions/${Number(nextId)}`, {
        state: { questions },
      });
    }
  };

  const handlePrev = () => {
    const currentIndex = questions.findIndex(
      (ques) => Number(ques.id) === currentId,
    );
    if (currentIndex !== -1) {
      const prevId = questions[currentIndex - 1].id;
      navigate(`/questions/${Number(prevId)}`, {
        state: { questions },
      });
    }
  };

  const {
    title,
    description,
    keywords,
    longAnswer,
    shortAnswer,
    rate,
    complexity,
    questionSkills,
    createdBy,
  } = question;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="question-layout">
        <div className="question_col">
          <Link className="question-back" to={"/questions"} replace>
            <img
              className="question-back__icon"
              src={caretLeft}
              alt="Стрелка влево"
            />
            <span className="question-back__text">Назад</span>
          </Link>
          <section className="question-header">
            <img
              className="question-header__img"
              src={questionImg}
              alt="Иконка"
            />
            <div className="question-header__info">
              <div className="question-header__col">
                <h2 className="question-header__title">{title}</h2>
                <p className="question-header__desc">{description}</p>
              </div>
              <img
                onClick={() => setIsOpen(true)}
                className="question-filter__btn"
                src={showFilter}
                alt="Показать фильтр"
              />
            </div>
          </section>
          <section className="question-nav">
            <button
              onClick={handlePrev}
              className="question-nav__btn question-nav__btn--prev"
            >
              <img src={altArrowLeft} alt="" aria-hidden="true" />
              <span className="question-nav__text">Предыдущий</span>
            </button>

            <button
              onClick={handleNext}
              className="question-nav__btn question-nav__btn--next"
            >
              <span className="question-nav__text">Следующий</span>
              <img src={altArrowRight} alt="" aria-hidden="true" />
            </button>
          </section>
          <QuestionAnswer title="Краткий ответ" answer={shortAnswer} />
          <QuestionAnswer title="Развернутый ответ" answer={longAnswer} />
        </div>
        <QuestionSidebar
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          createdBy={createdBy}
          rate={rate}
          complexity={complexity}
          questionSkills={questionSkills}
          keywords={keywords}
        />
      </div>
    </div>
  );
}
