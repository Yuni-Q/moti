import API from "../utils/API";
import File from './File';
import Mission from "./Mission";
import User from "./User";

export default class Answer  {
  protected static readonly api: API = new API('/api');

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

  public static postAnswers ({ formData, token }: { formData: FormData; token: string; }): Promise<void> {
    return this.api.post(`/v1/answers/`, formData, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
    });
}

  public static putAnswersId ({ formData, answer,token }: { formData: FormData; answer: Answer; token: string; }): Promise<void>  {
      return this.api.put(`/v1/answers/${answer.id}`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      });
  }

  public static getAnswersId ({ id,token }: { id: string; token:string;}): Promise<Answer>  {
      return this.api.get(`/v1/answers/${id}`, {}, {
        headers: { Authorization: token },
      });
  }

  public static getAnswersWeek ({token}:{token: string}): Promise<{answers: Answer[]; today: string;}> {
      return this.api.get(`/v1/answers/week`, {}, {
        headers: { Authorization: token },
      });
  }

  public static getAnswersList ({token, id} : {token: string; id?: number;}): Promise<Answer[][]> {
    return this.api.get(`/v1/answers/list`, {answerId: id}, {
      headers: { Authorization: token },
    });
  }

  public static getAnswersListId ({token, id} : {token: string; id: number;}): Promise<Answer[]> {
    return this.api.get(`/v1/answers/list/${id}`, {}, {
      headers: { Authorization: token },
    });
  }
}