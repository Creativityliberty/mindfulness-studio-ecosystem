// hooks/useFormErrors.ts
import { useState } from "react";
import {
  isValidationError,
  isAuthError,
  isForbiddenError,
  isServerError,
  type ApiError,
} from "types/json-api";

interface FormErrorsState {
  fieldErrors: Record<string, string[]>;
  globalError: string | null;
  requiredRoles: string[];
}

interface UseFormErrorsReturn extends FormErrorsState {
  fieldError: (field: string) => string | undefined;
  setError: (error: ApiError) => void;
  clearErrors: () => void;
}

const initialState: FormErrorsState = {
  fieldErrors: {},
  globalError: null,
  requiredRoles: [],
};

export const useFormErrors = (): UseFormErrorsReturn => {
  const [state, setState] = useState<FormErrorsState>(initialState);

  const setError = (error: ApiError): void => {
    if (isValidationError(error)) {
      setState({
        fieldErrors: error.response.data.errors,
        globalError: error.response.data.message,
        requiredRoles: [],
      });
      return;
    }

    if (isAuthError(error)) {
      setState({
        fieldErrors: {},
        globalError: error.response.data.message,
        requiredRoles: [],
      });
      return;
    }

    if (isForbiddenError(error)) {
      setState({
        fieldErrors: {},
        globalError: error.response.data.message,
        requiredRoles: error.response.data.required_roles,
      });
      return;
    }

    if (isServerError(error)) {
      setState({
        fieldErrors: {},
        globalError: error.response.data.message,
        requiredRoles: [],
      });
    }
  };

  const clearErrors = (): void => setState(initialState);

  return {
    ...state,
    fieldError: (field) => state.fieldErrors[field]?.[0],
    setError,
    clearErrors,
  };
};
