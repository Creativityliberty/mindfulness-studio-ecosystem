import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";

// Types de base JSON:API
export interface JsonApiVersion {
  version: string;
}

export interface JsonApiLinks {
  self?: string;
  related?: string;
  first?: string;
  last?: string;
  prev?: string | null;
  next?: string | null;
}

export interface JsonApiResourceIdentifier {
  type: string;
  id: string;
}

export interface JsonApiRelationship<
  T = JsonApiResourceIdentifier | JsonApiResourceIdentifier[] | null,
> {
  data?: T;
  links?: {
    related?: string;
    self?: string;
  };
  meta?: Record<string, string | number | boolean>;
}

export interface JsonApiResource<
  TType extends string = string,
  TAttributes = object, // Plus simple et flexible
  TRelationships = Record<string, JsonApiRelationship>,
  TMeta = Record<string, unknown>,
> {
  type: TType;
  id: string;
  attributes: TAttributes;
  relationships?: TRelationships;
  links?: JsonApiLinks;
  meta?: TMeta;
}

export interface JsonApiMeta {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
  [key: string]: string | number | boolean | null | undefined;
}

export interface JsonApiDocument<
  T,
  TIncluded extends JsonApiResourceIdentifier = JsonApiResource,
> {
  jsonapi?: JsonApiVersion;
  data: T;
  included?: TIncluded[];
  meta?: JsonApiMeta;
  links?: JsonApiLinks;
}

// =========== API ERROR ===========
export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export interface AuthErrorResponse {
  message: string;
  exception: string | null;
  guards: string[] | null;
}

export interface ForbiddenErrorResponse {
  message: string;
  required_roles: string[];
  exception: string | null;
}

export interface ServerErrorResponse {
  message: string;
  exception: string | null;
}

// ─── Axios errors typés par status ───────────────────────────

type AxiosErrorWithResponse<T> = AxiosError<T> & {
  response: AxiosResponse<T>;
};

// ─── Axios errors typés par status ───────────────────────────

export type ValidationError = AxiosErrorWithResponse<ValidationErrorResponse>;
export type AuthError = AxiosErrorWithResponse<AuthErrorResponse>;
export type ForbiddenError = AxiosErrorWithResponse<ForbiddenErrorResponse>;
export type ServerError = AxiosErrorWithResponse<ServerErrorResponse>;

// ─── Union ───────────────────────────────────────────────────

export type ApiError =
  | ValidationError
  | AuthError
  | ForbiddenError
  | ServerError;

// ─── Type Guards ─────────────────────────────────────────────

export const isValidationError = (
  error: ApiError,
): error is ValidationError => {
  return (
    isAxiosError(error) &&
    error.response !== undefined &&
    error.response.status === 422 &&
    "errors" in error.response.data
  );
};

export const isAuthError = (error: ApiError): error is AuthError => {
  return (
    isAxiosError(error) &&
    error.response !== undefined &&
    error.response.status === 401
  );
};

export const isForbiddenError = (error: ApiError): error is ForbiddenError => {
  return (
    isAxiosError(error) &&
    error.response !== undefined &&
    error.response.status === 403
  );
};

export const isServerError = (error: ApiError): error is ServerError => {
  return (
    isAxiosError(error) &&
    error.response !== undefined &&
    error.response.status >= 500
  );
};

// ─── Cast AxiosError → ApiError ──────────────────────────────

export const toApiError = (error: AxiosError): ApiError => {
  const status = error.response?.status;

  if (status === 422) return error as ValidationError;
  if (status === 401) return error as AuthError;
  if (status === 403) return error as ForbiddenError;
  return error as ServerError;
};

// ─── Pagination ───────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}
