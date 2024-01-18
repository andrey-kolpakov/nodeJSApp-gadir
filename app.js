//v1
// // Установите необходимые зависимости перед использованием:
// // npm install node-cron axios

// const cron = require('node-cron');
// const axios = require('axios');

// // Замените URL и параметры на свои
// const chatUrl = 'https://interface.gadir-jeweler.kz/';
// const chatMessage = 'Проверка';

// // Запускаем cron job каждые 1 минут
// cron.schedule('*/1 * * * *', () => {
//   // Отправляем сообщение в чат
//   axios.post(chatUrl, { message: chatMessage })
//     .then(response => {
//       console.log('Сообщение успешно отправлено:', response.data);
//     })
//     .catch(error => {
//       console.error('Ошибка при отправке сообщения:', error.message);
//     });
// });

// console.log('Планировщик задач запущен');

//v2
// const express = require('express')
// const app = express()

// app.get('/', function(req, res){

//     res.set('Content-Type', 'text/html; charset=utf-8')
//     res.send("<h1>Hello</h1>")

// })

// app.listen(process.env.PORT || 3000)

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

// Позволяет приложению парсить тело запроса в формате JSON
app.use(bodyParser.json())

// Обработчик для вебхука
app.post('/webhook', (req, res) => {
    console.log('Проверка')
    console.log('Получен вебхук:', req.body)
    // Добавьте код обработки вебхука здесь

    res.status(200).send('Вебхук успешно обработан')
})

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
