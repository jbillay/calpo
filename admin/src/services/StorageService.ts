const TOKEN_KEY = "access_token";
const USER_KEY = "access_user";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const StorageService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || "{}");
  },

  saveUser(userInfo: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  }
};

export default StorageService;