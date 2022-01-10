import Login from "../components/Login";
import { LoginResponseType, LoginUserInputType } from "../type";
import axios from "axios";
import { BASE_URL } from "../common";

function LoginContainer() {
  const onLogin = async (userInfo: LoginUserInputType) => {
    const { data } = await axios.post<LoginResponseType>(
      `http://${BASE_URL}/api/user/login`,
      userInfo
    );
  };

  return <Login onLogin={onLogin} />;
}

export default LoginContainer;
