import { UserResponseType, SignupUserInputType } from "../type";
import axios from "axios";
import { BASE_URL } from "../common";
import Signup from "../components/Signup";

function SignupContainer() {
  const onSignup = async (userInfo: SignupUserInputType) => {
    const { data } = await axios.post<UserResponseType>(
      `http://${BASE_URL}/api/user/signup`,
      userInfo
    );
  };

  return <Signup onSignup={onSignup} />;
}

export default SignupContainer;
