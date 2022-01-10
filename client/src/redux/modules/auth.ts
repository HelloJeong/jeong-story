import { UserResponseType } from "./../../type";
import { Action, createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../../services/UserService";
import { LoginUserInputType } from "../../type";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = "jeong-story/auth";

export const { pending, success, fail } = createActions("PENDING", "SUCCESS", "FAIL", { prefix });

const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });
function* loginSaga(action: Action<LoginUserInputType>) {
  try {
    yield put(pending());
    const response: UserResponseType = yield call(UserService.login, action.payload);
    yield put(success(/* */));
  } catch (err) {
    yield put(fail(new Error()));
  }
}
function* logoutSaga() {}
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
