import Cookies from "universal-cookie";
import { IncomingMessage } from "http";

export default class Cookie {
    static cookies = new Cookies();

    public static getToken(req?: IncomingMessage): string {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		return cookies.get('token');
    }
}