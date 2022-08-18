export interface ILogin {
  email: string;
  password: string;
}

export interface IUserService {
  login({ email, password }: ILogin): Promise<string>;
}
