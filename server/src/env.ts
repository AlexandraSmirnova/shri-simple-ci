import config from './config';


export const PORT = process.argv[2] || config.PORT;

export const HOST = process.argv[3] || config.HOST;

export const REPO_ADRESS =  process.argv[4] || config.REPO_ADRESS;