import Cookies from "universal-cookie";
import { IncomingMessage } from "http";

export default class Cookie {
    static cookies = new Cookies();

    public static getToken(req?: IncomingMessage): string {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		return cookies.get('token');
    }

    public static setToken({req, token}: {req?: IncomingMessage; token: string}): void {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		cookies.set('token', token);
    }
    
    public static removeToken({req}: {req?: IncomingMessage;}): void {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		cookies.remove('token');
    }
    
    public static getOnboard(req?: IncomingMessage): string {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		return cookies.get('onboard');
    }

    public static setOnboard({req}: {req?: IncomingMessage;}): void {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		cookies.set('onboard', 'true');
    }
}