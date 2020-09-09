import axios from 'axios';
import Cookies from "universal-cookie";
import API from "../utils/API";
import File from './File';
import Mission from "./Mission";
import User from "./User";
import Cookie from '../utils/Cookie';

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

  public static editAnswer ({ formData, answer,token }: { formData: FormData; answer: Answer; token: string; }) {
      return this.api.put(`/answers/${answer.id}`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      });
  }

  public static getAnswer ({ id,token }: { id: string; token:string;}) {
      return this.api.get(`/answers/${id}`, {}, {
        headers: { Authorization: token },
      });
  }
}