export interface CreateUserRequest {
  name: string;
  surname: string;
  patronymic?: string;
  email: string;
  mobilePhone: number;
  login: string;
  password: string;
}