import { RecurrenceRule } from "@/types";

export const recurrenceLabels: Record<RecurrenceRule, string> = {
  weekly_friday:          "Tous les vendredis",
  weekly_saturday:        "Tous les samedis",
  weekly_sunday:          "Tous les dimanches",
  every_weekend:          "Chaque week-end",
  monthly_first_saturday: "1er samedi du mois",
  monthly_last_friday:    "Dernier vendredi du mois",
  biweekly:               "Toutes les 2 semaines",
};

export const recurrenceOptions = Object.entries(recurrenceLabels) as [RecurrenceRule, string][];

/**
 * Retourne le prochain texte de date à afficher pour un événement récurrent
 * Ex: "Tous les samedis · prochain: 24 mai"
 */
export function getNextOccurrenceText(rule: RecurrenceRule): string {
  const now = new Date();
  const nextDate = getNextOccurrence(rule, now);
  const formatted = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" }).format(nextDate);
  return `Prochain : ${formatted}`;
}

export function getNextOccurrence(rule: RecurrenceRule, from: Date): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);

  const dayOfWeek = (target: number) => {
    const diff = (target - d.getDay() + 7) % 7 || 7;
    const next = new Date(d);
    next.setDate(d.getDate() + diff);
    return next;
  };

  switch (rule) {
    case "weekly_friday":   return dayOfWeek(5);
    case "weekly_saturday": return dayOfWeek(6);
    case "weekly_sunday":   return dayOfWeek(0);
    case "every_weekend": {
      const fri = dayOfWeek(5);
      const sat = dayOfWeek(6);
      return fri < sat ? fri : sat;
    }
    case "biweekly": {
      const next = new Date(d);
      next.setDate(d.getDate() + 14);
      return next;
    }
    case "monthly_first_saturday": {
      const next = new Date(d.getFullYear(), d.getMonth(), 1);
      while (next.getDay() !== 6) next.setDate(next.getDate() + 1);
      if (next <= d) {
        next.setMonth(next.getMonth() + 1, 1);
        while (next.getDay() !== 6) next.setDate(next.getDate() + 1);
      }
      return next;
    }
    case "monthly_last_friday": {
      const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      while (last.getDay() !== 5) last.setDate(last.getDate() - 1);
      if (last <= d) {
        const nextMonth = new Date(d.getFullYear(), d.getMonth() + 2, 0);
        while (nextMonth.getDay() !== 5) nextMonth.setDate(nextMonth.getDate() - 1);
        return nextMonth;
      }
      return last;
    }
    default: return d;
  }
}