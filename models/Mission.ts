import API from "../utils/API";

export default class Mission {

  protected static readonly api: API = new API();

  id?: number;

  title?: string;

  isContent?: boolean;

  isImage?: boolean;

  cycle?: number;

  createdAt?: Date;

  updatedAt?: Date;

  public static getMissionsId ({id, token}: {id: string; token: string;}) {
    return this.api.get(`/v1/missions/${id}`, {}, {
      headers: { Authorization: token },
    });
  }
}