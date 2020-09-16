import axios from 'axios';
import { google } from 'googleapis';
import { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { consoleError } from '../../utils/log';

export default async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const HOST = process.env.NODE_ENV === "production" ? 'https%3a%2f%2fyuni-q.herokuapp.com' :'http%3a%2f%2flocalhost%3a8080'
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            `${HOST}%2fapi%2fgoogle`,
        );
        const qs = new url.URL(req.url || '', HOST).searchParams;
        const code = qs.get('code');
        // eslint-disable-next-line camelcase
        const {tokens: {access_token}} = await oauth2Client.getToken(code || '');
        const result = await axios.post('https://moti.company/api/v1/signin', { snsType: 'google' }, {
            headers: { Authorization: access_token },
        })
        res.writeHead(301, {
            'Set-Cookie':`token=${result.data.data.accessToken}; Path=/`,
            'Location': '/'
        });
        res.end()
    } catch(error) {
        consoleError('error', error);
        res.end('Error');
    }
    
};