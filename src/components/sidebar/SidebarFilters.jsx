import { useEffect, useState } from "react";
import SidebarGroup from "./SidebarGroup";
import { COMPLEXITY_OPTIONS, RATING_OPTIONS } from "../../constants/constants";
import { getSkills } from "../../api/requests";
import axios from "axios";

export default function SidebarFilters({
  specializations,
  filters,
  onUpdateFilter,
}) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    setSkills([]);

    const fetchSkills = async () => {
      try {
        const data = await getSkills({
          specializationId: filters.spec,
          signal: controller.signal,
        });

        console.log("skills", data);
        setSkills(data.data || []);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Запрос отменен");
          return;
        }
        console.error("Ошибка загрузки навыков:", error);
      }
    };

    fetchSkills();

    return () => {
      controller.abort();
    };
  }, [filters.spec]);

  return (
    <div>
      <SidebarGroup
        items={specializations}
        selected={filters.spec}
        onSelected={(e) => onUpdateFilter({ spec: e, skills: [] })}
        title="Специализация"
      />
      <SidebarGroup
        items={skills}
        limit={8}
        selected={filters.skills}
        onSelected={(e) => onUpdateFilter({ skills: e })}
        title="Навыки"
      />
      <SidebarGroup
        items={COMPLEXITY_OPTIONS}
        selected={filters.levels}
        onSelected={(e) => onUpdateFilter({ levels: e })}
        title="Уровень сложности"
      />
      <SidebarGroup
        items={RATING_OPTIONS}
        selected={filters.rates}
        onSelected={(e) => onUpdateFilter({ rates: e })}
        title="Рейтинг"
      />
    </div>
  );
}
