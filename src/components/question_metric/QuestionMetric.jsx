import "./question_metric.css";

export default function QuestionMetric({ label, value }) {
  return (
    <div className="question-metric">
      <p>{label}:</p>
      <div className="question-chip">{value}</div>
    </div>
  );
}
