const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

console.log('Check Node.js');
console.log('123');

app.get('/', (req, res) => {
    res.send('<h1>Привет, это главная страница!</h1>');
});

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Проверка');
    console.log('Получен вебхук:', req.body);
    res.status(200).send('Вебхук успешно обработан');
});

// Завершение работы сервера после обработки запросов
const server = app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

// Обработчик события завершения процесса
process.on('SIGTERM', () => {
    console.log('Принят сигнал SIGTERM. Завершение работы сервера.');
    server.close(() => {
        console.log('Сервер остановлен.');
        process.exit(0);
    });
});
