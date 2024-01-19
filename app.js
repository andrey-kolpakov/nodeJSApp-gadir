console.log('Check Node.js')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

console.log('123')

app.get('/', (req, res) => {
    res.send('<h1>Привет, это главная страница!</h1>')
})

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
