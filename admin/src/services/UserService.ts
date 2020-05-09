import ApiService from "./ApiService";
import StorageService from "./StorageService";

class AuthenticationError extends Error {
  public errorCode: string;
  public message: string;
  constructor(errorCode: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function(userInfo: any) {
    try {
      const response: any = await ApiService.post("auth/login", userInfo);
      const { token, ...user } = response.data;
      StorageService.saveToken(token);
      StorageService.saveUser(user);
      ApiService.setHeader();
      return { token, user };
    } catch (error) {
      if (error.response) {
        throw new AuthenticationError(
          error.response.data.statusCode,
          error.response.data.message
        );
      } else {
        throw new Error(error);
      }
      
    }
  },

  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  logout() {
    // Remove the token and remove Authorization header from Api Service as well
    StorageService.removeToken();
    StorageService.removeUser();
    ApiService.removeHeader();
  },
};

export default UserService;

export { UserService, AuthenticationError };
