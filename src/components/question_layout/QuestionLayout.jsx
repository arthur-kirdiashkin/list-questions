import { useEffect, useState } from "react";
import QuestionList from "../question_list/QuestionList";
import Sidebar from "../sidebar/Sidebar";
import "./question_layout.css";
import { INITIAL_FILTERS, LIMIT } from "../../constants/constants";
import QuestionPagination from "../question_pagination/QuestionPagination";
import Spinner from "../spinner/Spinner";
import { getQuestions, getSpecializations } from "../../api/requests";
import filter from "../../assets/filter.png";

export default function QuestionLayout() {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const { data } = await getSpecializations();

        setSpecializations(data || []);
      } catch (error) {
        console.error("Ошибка загрузки специализаций:", error);
      }
    };

    fetchSpecializations();
  }, []);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data, total } = await getQuestions({
          page: currentPage,
          limit: LIMIT,
          filters,
        });

        setTotalPages(Math.ceil((total || 0) / LIMIT));

        setQuestions(data || []);
      } catch (error) {
        console.error("Ошибка при загрузке вопросов:", error);
        setQuestions([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filters, currentPage]);

  const currentSpec = specializations.find((spec) => spec.id === filters.spec);

  const pageTitle = currentSpec ? `Вопросы ${currentSpec.title}` : "";

  return (
    <main>
      <div className="container">
        <div className="question-layout">
          <div className="questions-column">
            <div className="questions-header">
              <h1 className="questions-title">{pageTitle}</h1>

              <img
                onClick={() => setOpenFilter(true)}
                className="questions-filter"
                src={filter}
                alt="Фильтр"
              />
            </div>
            {loading ? <Spinner /> : <QuestionList questions={questions} />}
            {totalPages > 1 && (
              <QuestionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          <Sidebar
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            specializations={specializations}
            filters={filters}
            onUpdateFilter={updateFilter}
          />
        </div>
      </div>
    </main>
  );
}
