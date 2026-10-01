export const COMPLEXITY_OPTIONS = [
  { id: "1-3", title: "1–3", value: [1, 2, 3] },
  { id: "4-6", title: "4–6", value: [4, 5, 6] },
  { id: "7-8", title: "7–8", value: [7, 8] },
  { id: "9-10", title: "9–10", value: [9, 10] },
];

export const RATING_OPTIONS = [1, 2, 3, 4, 5].map((num) => ({
  id: num,
  title: String(num),
  value: num,
}));

export const INITIAL_FILTERS = {
  spec: 11,
  skills: [],
  levels: [],
  rates: [],
  search: "",
};

export const LIMIT = 10;
