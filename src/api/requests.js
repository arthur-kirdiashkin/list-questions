import axios from "axios";
import { BASE_URL } from "../constants/api";
import { COMPLEXITY_OPTIONS } from "../constants/constants";

export const getQuestions = async ({ page, limit, filters }) => {
  const { spec, skills = [], levels = [], rates = [], search = "" } = filters;

  const levelValues = levels.reduce((acc, value) => {
    const level = COMPLEXITY_OPTIONS.find((e) => e.id === value);
    if (level) {
      acc.push(level.value);
    }
    return acc;
  }, []);

  const response = await axios.get(`${BASE_URL}/questions/public-questions`, {
    params: {
      page,
      limit,
      specializationId: spec || undefined,
      skills: skills.length ? skills : undefined,
      complexity: levelValues.length ? levelValues.flat() : undefined,
      rate: rates.length ? rates : undefined,
      title: search.trim() || undefined,
    },
  });

  return response.data;
};

export const getSpecializations = async () => {
  const response = await axios.get(`${BASE_URL}/specializations`);

  return response.data;
};

export const getSkills = async ({ specializationId, limit = 50 }) => {
  const response = await axios.get(`${BASE_URL}/skills`, {
    params: {
      limit,
      specializations: specializationId || undefined,
    },
  });

  return response.data;
};

export const getQuestion = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/questions/public-questions/${id}`,
  );

  return response.data;
};
