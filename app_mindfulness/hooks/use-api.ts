// hooks/useApi.ts
import { useState, useCallback } from "react";
import { isAxiosError, type AxiosRequestConfig } from "axios";
import { api } from "@/lib/api";
import { toApiError, type ApiError } from "types/json-api";

interface ApiState<TData> {
  data: TData | null;
  loading: boolean;
  error: ApiError | null;
  requestId: string | null;
}

interface UseApiReturn<TData> extends ApiState<TData> {
  execute: (config: AxiosRequestConfig) => Promise<TData | null>;
  reset: () => void;
}

const initialState = <TData>(): ApiState<TData> => ({
  data: null,
  loading: false,
  error: null,
  requestId: null,
});

export const useApi = <TData>(): UseApiReturn<TData> => {
  const [state, setState] = useState<ApiState<TData>>(initialState<TData>());

  const execute = useCallback(
    async (config: AxiosRequestConfig): Promise<TData | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await api<TData>(config);

        setState({
          data: response.data,
          loading: false,
          error: null,
          requestId: response.headers["x-request-id"] ?? null,
        });

        return response.data;
      } catch (err) {
        if (!isAxiosError(err)) throw err;

        const apiError = toApiError(err);

        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiError,
          requestId: err.response?.headers?.["x-request-id"] ?? null,
        }));

        return null;
      }
    },
    [],
  );

  const reset = useCallback((): void => setState(initialState<TData>()), []);

  return { ...state, execute, reset };
};
