const http = require('http');
const { getUsers } = require('./modules/users');

const hostname = '127.0.0.1';
const port = 3003;

const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${hostname}:${port}`);
    const name = url.searchParams.get('hello');
    const usersParam = url.searchParams.get('users');

    response.setHeader('Content-Type', 'text/plain');

    switch (true) {
        // Если передан параметр hello с именем
        case name !== null && name !== '':
            response.statusCode = 200;
            response.end(`Hello, ${name}`);
            break;

        // Если передан параметр hello, но имя пустое
        case name !== null && name === '':
            response.statusCode = 400;
            response.end('Enter a name');
            break;

        // Если передан параметр users
        case usersParam !== null:
            getUsers((data) => {

                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.end(data);
            })
            break;

        // Если параметры не переданы
        case url.searchParams.toString() === '':
            response.statusCode = 200;
            response.end('Hello, World!');
            break;

        // Если переданы другие параметры
        default:
            response.statusCode = 500;
            response.end();
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
