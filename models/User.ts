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

  public static getUsersMy (token: string) {
    return this.api.get(`/v1/users/my`, {}, {
      headers: { Authorization: token },
    });
  }
}