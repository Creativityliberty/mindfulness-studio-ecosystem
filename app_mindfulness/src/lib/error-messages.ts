import { env } from "@/lib/env";
import {
  isValidationError,
  isAuthError,
  isForbiddenError,
  isServerError,
  type ApiError,
} from "types/json-api";

export interface ErrorDisplay {
  title: string;
  message: string;
  debug: string | null;
}

export const toErrorDisplay = (error: ApiError): ErrorDisplay => {
  if (isValidationError(error)) {
    return {
      title: "Données invalides",
      message: error.response.data.message,
      debug: null,
    };
  }

  if (isAuthError(error)) {
    return {
      title: "Non authentifié",
      message: "Vos identifiants sont incorrects.",
      debug: env.isDev
        ? `Guards: ${error.response.data.guards?.join(", ")} — ${error.response.data.exception}`
        : null,
    };
  }

  if (isForbiddenError(error)) {
    return {
      title: "Accès refusé",
      message: "Vous n'avez pas les droits nécessaires.",
      debug: env.isDev
        ? `Rôles requis: ${error.response.data.required_roles.join(", ")} — ${error.response.data.exception}`
        : null,
    };
  }

  if (isServerError(error)) {
    return {
      title: "Erreur serveur",
      message: "Une erreur inattendue est survenue.",
      debug: env.isDev ? error.response.data.exception : null,
    };
  }

  return {
    title: "Erreur",
    message: "Une erreur est survenue.",
    debug: null,
  };
};
