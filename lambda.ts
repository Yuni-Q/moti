import AWSServerlessExpress from 'aws-serverless-express';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import nextServer from './server';

const binaryMimeTypes = [
    'application/javascript',
    'application/json',
    'application/octet-stream',
    'application/xml',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'text/comma-separated-values',
    'text/css',
    'text/html',
    'text/javascript',
    'text/plain',
    'text/text',
    'text/xml'
];

export const handler = async (event: any, context: any) => {
    try {
        const app = await nextServer();
        app.use(awsServerlessExpressMiddleware.eventContext());
        const server = AWSServerlessExpress.createServer(app, () => null, binaryMimeTypes);
        return AWSServerlessExpress.proxy(server, event, context);
    } catch(error) {
        Error(error);
    }
};
