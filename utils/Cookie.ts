import Cookies from "universal-cookie";

export default class Cookie {
    static cookies = new Cookies();

    public static getToken() {
        return this.cookies.get('token');
    }
}