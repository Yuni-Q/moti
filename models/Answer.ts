import API from "../utils/API";
import User from "./User";
import File from './File'
import Mission from "./Mission";

export default class Answer  {
  api: API = new API();
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
}