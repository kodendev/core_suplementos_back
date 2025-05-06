export interface loginResponse {
  access_token: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
}
