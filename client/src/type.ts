/* Login */

export interface UserInfo {
  _id: string;
  email: string;
  name: string;
  token: string;
}

export interface LoginUserInputType {
  email: string;
  password: string;
}

export interface LoginComponentProps {
  onLogin: (userInfo: LoginUserInputType) => Promise<void>;
}

export interface LoginResponseType {
  result: boolean;
  user: UserInfo;
}
