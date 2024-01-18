// Установите необходимые зависимости перед использованием:
// npm install node-cron axios

const cron = require('node-cron');
const axios = require('axios');

// Замените URL и параметры на свои
const chatUrl = 'https://interface.gadir-jeweler.kz/';
const chatMessage = 'Проверка';

// Запускаем cron job каждые 1 минут
cron.schedule('*/1 * * * *', () => {
  // Отправляем сообщение в чат
  axios.post(chatUrl, { message: chatMessage })
    .then(response => {
      console.log('Сообщение успешно отправлено:', response.data);
    })
    .catch(error => {
      console.error('Ошибка при отправке сообщения:', error.message);
    });
});

console.log('Планировщик задач запущен');