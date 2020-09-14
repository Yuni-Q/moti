import API from "../utils/API";

export default class User  {
  protected static readonly api: API = new API();

  id? :number;

  birthday?: string;

  email? :string;

  name?: string;

  gender?: string;

  refreshDate?: string;

  refreshToken?: string;

  mission?: string;

  snsId?: string;

  snsType?: "google" | "apple";

  createdAt?: string;

  updatedAt?: string;

  public static getUsersMy ({ token } : {token: string}): Promise<User> {
    return this.api.get(`/v1/users/my/`, {}, {
      headers: { Authorization: token },
    });
  }
  
  public static deleteUser ({ token } : {token: string}): Promise<void> {
    return this.api.delete(`/v1/users/`, {}, {
      headers: { Authorization: token },
    });
  }
  
  public static putUser ({ token, body } : {token: string, body: {name: string; gender: string; birthday: string}}): Promise<void> {
    return this.api.put(`/v1/users/`, body, {
      headers: { Authorization: token },
    });
  }
}