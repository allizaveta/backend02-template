const http = require('http');
const { getUsers } = require('./modules/users');

const hostname = '127.0.0.1';
const port = 3003;

const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${hostname}:${port}`);
    const name = url.searchParams.get('hello');

    response.setHeader('Content-Type', 'text/plain');

    switch (true) {
        // Если запрашивается /users
        case url.pathname === '/users':
            getUsers((err, users) => {
                if (err) {
                    response.statusCode = 500;
                    response.end('Error reading users data');
                } else {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(users));
                }
            });
            break;

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

        // Если параметры не переданы
        case url.searchParams.toString() === '':
            response.statusCode = 200;
            response.end('Hello, World!');
            break;

        // Если переданы другие параметры или неверный путь
        default:
            response.statusCode = 500;
            response.end('');
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
