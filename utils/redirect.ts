import { ServerResponse } from "http";
import User from "../models/User";
import { log } from "./log";

export default (): string => {
    return ''
};

export const redirectRoot = (res?: ServerResponse): void => {
    if(res) {
        res.setHeader('location', '/');
        res.statusCode = 302;
        res.end();
    } else {
        window.location.pathname = '/'
    }
}

export const checkUser = async ({token}: {token: string}): Promise<boolean> => {
    try {
        const user = await User.getUsersMy(token);
        if(!user || !user.id) {
            return false;
        }
        return true;
    } catch(error) {
        log('error', error);
        return false;
    }
}