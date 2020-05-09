import { ActionContext } from "vuex";
import StorageService from "@/services/StorageService";
import UserService from "@/services/UserService";

interface UserMessage {
  msg: string;
  type: string;
}
class State {
  public status: string;
  public token: string;
  public user: any;
  public userMsg: UserMessage;

  constructor() {
    this.status = "";
    this.token = StorageService.getToken() || "";
    this.user = StorageService.getUser() || {};
    this.userMsg = { msg: "", type: "" };
  }
}

const loginAction = async function(
  { commit }: ActionContext<State, State>,
  userInfo: any
) {
  commit("userAuthRequest");
  try {
    const { token, user } = await UserService.login(userInfo);
    commit("userAuthSuccess", { token, user });
  } catch (error) {
    commit("userAuthError", error);
    throw new Error(error);
  }
};

const logoutAction = function({ commit }: ActionContext<State, State>) {
  commit("userLogout");
  UserService.logout();
};

const userAuthRequestMutation = function(state: State) {
  state.status = "loading";
  state.userMsg = { msg: "", type: "" };
};

const userAuthSuccessMutation = function(state: State, { token, user }: any) {
  state.status = "success";
  state.token = token;
  state.user =  user;
};

const userAuthErrorMutation = function(state: State, error: any) {
  state.userMsg = {
    type: "error",
    msg: error.message
  };
};
const userLogoutMutation = function(state: State) {
  state.status = "";
  state.token = "";
  state.user = {};
};

const isLoggedInGetter = function(state: State) {
  return !!state.token;
};

const isAdminGetter = function(state: State) {
  return (state.user.role === "admin");
};

const userInfoGetter = function(state: State) {
  return state.user;
};

const userMsgGetter = function(state: State) {
  return state.userMsg;
};

export default {
  namespaced: true,
  getters: {
    isLoggedIn: isLoggedInGetter,
    isAdmin: isAdminGetter,
    userInfo: userInfoGetter,
    userMsg: userMsgGetter
  },
  mutations: {
    userAuthRequest: userAuthRequestMutation,
    userAuthSuccess: userAuthSuccessMutation,
    userAuthError: userAuthErrorMutation,
    userLogout: userLogoutMutation
  },
  actions: {
    login: loginAction,
    logout: logoutAction
  },
  state: new State()
};
