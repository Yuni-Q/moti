import User from "../models/User";

export default () => {
    return ''
};

export const redirectRoot = (res: any) => {
    res.setHeader('location', '/');
    res.statusCode = 302;
    return false;
}

export const checkUser = async ({res,token}: {res: any, token: string}) => {
        try {
            if(!token) {
                return redirectRoot(res);
            }
            const user = await User.getUsersMy(token);
            if(user.id) {
                return true;
            }
            return false;
        } catch(error) {
            console.log('error', error);
            return false;
        }
		
        
}