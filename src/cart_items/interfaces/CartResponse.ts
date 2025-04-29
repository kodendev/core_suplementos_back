export interface CartResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  ERROR: boolean;
}
