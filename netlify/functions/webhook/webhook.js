import axios from 'axios';

const handler = async (event, context) => {
    try {
        console.log(event.body);
        const webhookString = event.body;

        // Декодирование строки
        const decodedString = decodeURIComponent(webhookString);

        // Разделение строки на массив пар ключ-значение
        const keyValuePairs = decodedString.split('&');

        // Создание объекта
        const webhookObject = {};
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split('=');
            webhookObject[key] = value;
        });

        // Вывод объекта в консоль
        console.log(webhookObject);

        const webhookUrl = "https://welcome-shark-wondrous.ngrok-free.app/webhook";

        webhookObject.mark = 'marked';

        // Ожидание завершения запроса
        await axios.post(webhookUrl, webhookObject)
            .then((response) => {
                console.log('Успешно отправлено:', response.data);
            })
            .catch((error) => {
                console.error('Ошибка отправки вебхука:', error.message);
            });

        return {
            statusCode: 200,
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};

export { handler };
