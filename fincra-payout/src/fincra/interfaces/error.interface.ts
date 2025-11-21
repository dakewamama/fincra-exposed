export interface FincraErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface AppError {
  statusCode: number;
  message: string;
  error: FincraErrorResponse | unknown;
  timestamp: string;
}
