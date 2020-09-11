import Cookies from "universal-cookie";

export default class Cookie {
    static cookies = new Cookies();

    public static getToken(req?: any) {
        const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
		return cookies.get('token');
    }
}