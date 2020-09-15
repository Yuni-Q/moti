import API from "../utils/API";

export default class File {

  api: API = new API();

  id?: number;

  cardUrl?: string;

  cardSvgUrl?: string;

  cardPngUrl?: string;

  part?: number;

  createdAt?: Date;

  updatedAt?: Date;
}