import MotiAPI from "../utils/MotiAPI";

export default class Signin  {
  protected static readonly api: MotiAPI = new MotiAPI('/api');

  accessToken?: string;

  refreshToken?: string

  signUp?: boolean;

  public static postSignin ({ accessToken, body }: { accessToken: string; body: {snsType: string} }): Promise<Signin> {
    return this.api.post(`/v1/signin/`, body, {
      headers: { Authorization: accessToken },
    });
  }

  public static postSigninGoogle ({ code }: { code: string; }): Promise<Signin> {
    return this.api.post(`/v1/signin/google`, { code});
  }

}