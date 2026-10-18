import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import QuestionLayout from "./components/question_layout/QuestionLayout";
import NotFound from "./components/NotFound";
import QuestionPage from "./pages/question_page/QuestionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/questions" replace />,
      },

      {
        path: "questions",
        children: [
          {
            index: true,
            element: <QuestionLayout />,
          },
          {
            path: ":questionId",
            element: <QuestionPage />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
