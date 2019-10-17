if (process.argv.length <= 2) {
    console.warn(
        "There is no adress of repository in args\n" +
        "The server will start for default repository: https://github.com/AlexandraSmirnova/shri-react-arcanum.git\n"
    );
}

export const REPOS_ROOT = process.argv[2];

export const PORT = process.argv[3] || '3000';

export const HOST = process.argv[4] || '127.0.0.1';