import config from './config';

export const PORT = process.argv[2] || config.PORT;

export const HOST = process.argv[3] || config.HOST;

export const SERVER_URL = process.argv[4] || config.SERVER_URL;

export const BUILD_ROOT = config.BUILD_ROOT;