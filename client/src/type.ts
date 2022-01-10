/* Login & Signup */

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

export interface UserResponseType {
  result: boolean;
  user: UserInfo;
}

export interface SignupUserInputType extends LoginUserInputType {
  name: string;
}

export interface SignupComponentProps {
  onSignup: (userInfo: SignupUserInputType) => Promise<void>;
}
