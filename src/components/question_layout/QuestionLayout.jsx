import { useEffect, useState } from "react";
import QuestionList from "../question_list/QuestionList";
import Sidebar from "../sidebar/Sidebar";
import "./question_layout.css";
import { INITIAL_FILTERS, LIMIT } from "../../constants/constants";
import QuestionPagination from "../question_pagination/QuestionPagination";
import Spinner from "../spinner/Spinner";
import { getQuestions, getSpecializations } from "../../api/requests";
import filter from "../../assets/filter.png";
import { useLocation, useSearchParams } from "react-router-dom";

export default function QuestionLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";

  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const [filters, setFilters] = useState({
    ...INITIAL_FILTERS,
    ...(location.state?.currentFilters ?? {}),
    search: searchParam,
  });
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

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchParam }));
  }, [searchParam]);

  const updateFilter = (key, value) => {
    if (key === "search") {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
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
  }, [filters, currentPage, searchParam]);

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
            {loading ? (
              <Spinner />
            ) : (
              <QuestionList questions={questions} filters={filters} />
            )}
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
