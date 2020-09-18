import MotiAPI from "../utils/MotiAPI";

export default class File {

  protected static readonly api: MotiAPI = new MotiAPI('/api');

  id?: number;

  cardUrl?: string;

  cardSvgUrl?: string;

  cardPngUrl?: string;

  part?: number;

  createdAt?: Date;

  updatedAt?: Date;
}