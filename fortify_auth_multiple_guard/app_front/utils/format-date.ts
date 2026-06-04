/**
 * Formate une date ISO en format lisible français
 * @param dateString - Date au format ISO (ex: "2026-02-01T09:49:40.000000Z")
 * @param options - Options de formatage
 * @returns Date formatée (ex: "1 févr. 2026")
 */
export const formatDate = (
  dateString: string | null,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
): string => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};

/**
 * Formate une date en format relatif (il y a X jours)
 * @param dateString - Date au format ISO
 * @returns Date relative (ex: "Il y a 2 jours")
 */
export const formatRelativeDate = (dateString: string | null): string => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `Il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `Il y a ${months} mois`;
    }
    const years = Math.floor(diffInDays / 365);
    return `Il y a ${years} an${years > 1 ? "s" : ""}`;
  } catch (error) {
    console.error("Error formatting relative date:", error);
    return "-";
  }
};

/**
 * Convertit une date ISO en valeur pour <input type="date"> (YYYY-MM-DD)
 * @param dateString - Date au format ISO (ex: "2026-02-01T09:49:40.000000Z")
 * @returns Date au format YYYY-MM-DD (ex: "2026-02-01") ou "" si invalide
 */
export const toDateInput = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  return dateString.substring(0, 10);
};

/**
 * Convertit une heure en valeur pour <input type="time"> (HH:mm)
 * Gère "HH:mm", "HH:mm:ss" et les chaînes ISO datetime
 */
export const toTimeInput = (timeString: string | null | undefined): string => {
  if (!timeString) return "";
  if (timeString.includes("T")) {
    return timeString.substring(11, 16);
  }
  return timeString.substring(0, 5);
};

/**
 * Formate une date avec l'heure
 * @param dateString - Date au format ISO
 * @returns Date avec heure (ex: "1 févr. 2026 à 09h49")
 */
export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting datetime:", error);
    return "-";
  }
};
