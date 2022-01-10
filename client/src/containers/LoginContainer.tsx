import { useDispatch } from "react-redux";
import Login from "../components/Login";
import { login } from "../redux/modules/auth";
import { LoginUserInputType } from "../type";

function LoginContainer() {
  const dispatch = useDispatch();
  const onLogin = async (userInfo: LoginUserInputType) => {
    dispatch(login(userInfo));
  };

  return <Login onLogin={onLogin} />;
}

export default LoginContainer;
