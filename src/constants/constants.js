import figma from "../assets/figma.png";
import gitHub from "../assets/github.png";
import telegram from "../assets/telegram.png";
import tic from "../assets/tic.png";
import youtube from "../assets/youtube.png";

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

export const PREPARATION_LINKS = [
  { label: "База вопросов", href: "#!" },
  { label: "Тренажер", href: "#!" },
  { label: "Материалы", href: "#!" },
  { label: "Навыки (hh)", href: "#!" },
];

export const SOCIALS = [
  { id: "figma", icon: figma, alt: "Figma" },
  { id: "github", icon: gitHub, alt: "GitHub" },
  { id: "telegram", icon: telegram, alt: "Telegram" },
  { id: "tiktok", icon: tic, alt: "TikTok" },
  { id: "youtube", icon: youtube, alt: "YouTube" },
];
