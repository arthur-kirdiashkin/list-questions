import { useEffect, useState } from "react";
import QuestionList from "../question_list/QuestionList";
import Sidebar from "../sidebar/Sidebar";
import "./question_layout.css";
import { LIMIT } from "../../constants/constants";
import QuestionPagination from "../question_pagination/QuestionPagination";
import Spinner from "../spinner/Spinner";
import { getQuestions, getSpecializations } from "../../api/requests";
import filter from "../../assets/filter.png";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function QuestionLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const specParam = searchParams.get("spec")
    ? Number(searchParams.get("spec"))
    : 11;
  const levelParam = searchParams.get("levels")
    ? searchParams.get("levels").split(",")
    : [];
  const skillsParam = searchParams.get("skills")
    ? searchParams.get("skills").split(",")
    : [];
  const ratesParam = searchParams.get("rates") || [];

  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    rates: ratesParam,
    spec: specParam,
    skills: skillsParam,
    levels: levelParam,
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

  const updateFilter = (newParams) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        const isEmpty =
          value === "" || (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params;
    });

    setFilters((prev) => ({
      ...prev,
      ...newParams,
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data, total } = await getQuestions({
          page: currentPage,
          limit: LIMIT,
          filters,
          signal: controller.signal,
        });

        setTotalPages(Math.ceil((total || 0) / LIMIT));

        setQuestions(data || []);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Запрос отменен");
          return;
        }
        console.error("Ошибка при загрузке вопросов:", error);

        setQuestions([]);
        setTotalPages(0);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      controller.abort();
    };
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
