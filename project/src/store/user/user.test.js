import { user } from "./user";
import { ActionType } from "../action";
import { AuthorizationStatus } from '../../const';

const initialState = {
  authorizationStatus: "",
  user: {
    login: "",
    avatarUrl: "",
  },
};

describe("Reducer: user", () => {
  it("without action should return initial state", () => {
    expect(user(initialState, {})).toEqual(initialState);
  });

  it("action required authorization should return updated state", () => {
    const authorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };


    expect(user(initialState, authorizationAction)).toEqual({...initialState, authorizationStatus: authorizationAction.payload});
  });

  it("action login should return updated state", () => {
    const userAction = {
      type: ActionType.USER,
      payload: {
        login: 'user',
        email: 'email@email.ru'
      },
    };


    expect(user(initialState, userAction)).toEqual({...initialState, user: userAction.payload});
  });

  it("action login should return updated state", () => {
    const logoutAction = {
      type: ActionType.LOGOUT,
    };

    expect(user(initialState, logoutAction)).toEqual({...initialState, authorizationStatus: AuthorizationStatus.NO_AUTH});
  });
});
