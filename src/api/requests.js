import axios from "axios";
import { BASE_URL } from "../constants/api";

export const getQuestions = async ({ page, limit, filters }) => {
  const response = await axios.get(`${BASE_URL}/questions/public-questions`, {
    params: {
      page,
      limit,
      specializationId: filters.spec || undefined,
      skills: filters.skills.length ? filters.skills : undefined,
      complexity: filters.levels.length ? filters.levels : undefined,
      rate: filters.rates.length ? filters.rates : undefined,
      title: filters.search.trim() || undefined,
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
