import API from "../utils/API";

export default class Mission {
  protected static readonly api: API = new API('/api');

  id?: number;

  title?: string;

  isContent?: boolean;

  isImage?: boolean;

  cycle?: number;

  createdAt?: Date;

  updatedAt?: Date;

  public static getMissionsId ({id, token}: {id: string; token: string;}): Promise<Mission> {
    return this.api.get(`/v1/missions/${id}/`, {}, {
      headers: { Authorization: token },
    });
  }

  public static getMissions ({token}: {token: string;}): Promise<{missions: Mission[]; refresh: boolean;}> {
    return this.api.get(`/v1/missions/`, {}, {
      headers: { Authorization: token },
    });
  }

  public static getMissionsRefresh ({token}: {token: string;}): Promise<{missions: Mission[]; refresh: boolean;}> {
    return this.api.get(`/v1/missions/refresh/`, {}, {
      headers: { Authorization: token },
    });
  }
}