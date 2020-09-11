import API from "../utils/API";
import File from './File';
import Mission from "./Mission";
import User from "./User";

export default class Answer  {
  static api: API = new API();

  id?: number;

  userId?: number;

  missionId?: number;

  fileId?: number;

  imageUrl?: string;

  content?: string;

  date?: string;

  setDate?: string;

  no?: number;

  file?: File;

  mission?: Mission;

  user?: User;

  createdAt?: Date;

  updatedAt?: Date;

  public static postAnswers ({ formData, token }: { formData: FormData; token: string; }) {
    return this.api.post(`/v1/answers/`, formData, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
    });
}

  public static putAnswersId ({ formData, answer,token }: { formData: FormData; answer: Answer; token: string; }) {
      return this.api.put(`/v1/answers/${answer.id}`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      });
  }

  public static getAnswersId ({ id,token }: { id: string; token:string;}) {
      return this.api.get(`/v1/answers/${id}`, {}, {
        headers: { Authorization: token },
      });
  }

  public static getAnswersWeek (token:string) {
      return this.api.get(`/v1/answers/week`, {}, {
        headers: { Authorization: token },
      });
  }
}