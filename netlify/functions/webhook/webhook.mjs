import axios from 'axios';

import { Client } from 'amocrm-js'
import { Token } from '../../../Token.mjs'



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

        await run(webhookObject);

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

        
    async function run(info) {
        console.log('run run run')

        const client = new Client({
            // логин пользователя в портале, где адрес портала domain.amocrm.ru
            domain: 'liyavais1408.amocrm.ru', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
            /*
              Информация об интеграции (подробности подключения
              описаны на https://www.amocrm.ru/developers/content/oauth/step-by-step)
            */
            auth: {
                client_id: 'fc34dd9d-ae87-4650-8a02-43272565abbf', // ID интеграции
                client_secret: 'Dmzl1bL4QP3my1vxFXLh96ivonlumrPqxbfA8kYa9gfrU4FGN6ax66dP9xCaWnh7', // Секретный ключ
                redirect_uri: 'https://ya.ru/', // Ссылка для перенаправления
                code: 'def502009fe76c50a27dd5482f330f67438634c0244059bb3ff2d2957a3a8a3e62b4c2a130dc4464471b3d698623eab1a452032f6685b0ab7f25e0452d9edea81a2cf56473a0dd46a597edea7063ad8a067bc739db49567b3d39bbc01c9d676565306ba72b316b2f0f3b492884455481412b8ba1aad0552e8887a5b96f52e78d624dc6ce03bf3f1a67c222f66e2f05f3a388d25f8ddda177d01b0d3a78d4be59d3e5bda0683163e2eb5e79fa866847cf14e5e1180ffc05826160091d350682669c3b1044bf1a5d8913399ef2599af2f2b1e483ecb2f797ff5812616ee0ca0ab610432ba75c7468fe5aa69ac73ddb1d07fcdd2d7928d7ad2e49e7372ccba76e2af7ce771f5b802a40dcea7c3e9be5bc6085dfb8c8d367ce079c8ac1147e432ecd7e83ba0e75ab04bcf9b0e1a7358180fb80003e37a17a52868111894481e6ef3276c404773c55ab0a90ba0788b703d491d83674d943f775439af972e48e7ebefbb288cd219b5d86d977ed7593c0c8e29edee9da5424bfe07daf1a3ef0c22d0326c9de7f71e2602225c2913b84f65a5237102363dd4807edb6cdc8c4b33bad07162dd137506ac3c5052548af9eee3b4c34454abab4f36accb2324468aa41b821c98ba16b04b563185c00575303ed85b0ab711717a29b159e49c2207948eb7c5536', // Код для упрощённой авторизации, необязательный
            },
        })
        
        client.token.setValue(Token);

        const auth = await client.connection.connect()
        const newToken = client.token.getValue()
    
        // постраничная навигация сделок
        const pagination = await client.leads.get({
            order: 'created_at',
        })
        
        console.log(info['leads[status][0][id]'])

        // массив объектов Lead на текущей странице
        const leads = pagination.getData()
               const nextPagination = await pagination.next();
    
        // Создаем объект с данными, который мы хотим записать в файл
        const dataToWrite = {
            leads: leads.map((contact) => cleanCircularReferences(contact)),
        }
    
        // console.log(dataToWrite)

        // const contact = await client.contacts.getById(123);
        
        await axios.post(webhookUrl, dataToWrite)
            .then((response) => {
                console.log('Успешно отправлено после обработки:', response.data);
            })
            .catch((error) => {
                console.error('Ошибка отправки вебхука:', error.message);
            });

        return {
            statusCode: 200,
        };
    }
    
    function cleanCircularReferences(obj) {
        const seen = new WeakSet()
        return JSON.parse(
            JSON.stringify(obj, (key, value) => {
                if (typeof value === 'object' && value !== null) {
                    if (seen.has(value)) {
                        return
                    }
                    seen.add(value)
                }
                return value
            })
        )
    }
    
    
};

export { handler };