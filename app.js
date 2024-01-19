const { send } = require('micro');
const { json, createError } = require('micro');

const server = async (req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        try {
            const body = await json(req);
            console.log('Получен вебхук:', body);
            send(res, 200, 'Вебхук успешно обработан');
        } catch (error) {
            console.error('Ошибка при обработке вебхука:', error);
            send(res, 500, 'Ошибка при обработке вебхука');
        }
    } else {
        send(res, 404, 'Not Found');
    }
};

const { PORT = 3000 } = process.env;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
