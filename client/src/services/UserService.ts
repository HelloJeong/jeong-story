import axios from "axios";
import { BASE_URL } from "../common";
import { LoginUserInputType, UserResponseType } from "../type";

const HTTP_BASE_URL = `http://${BASE_URL}`;

export default class UserService {
  public static async login(userInfo: LoginUserInputType) {
    const { data } = await axios.post<UserResponseType>(
      `${HTTP_BASE_URL}/api/user/login`,
      userInfo
    );
    return data;
  }
}
