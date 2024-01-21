import axios from 'axios'

import { Client } from 'amocrm-js'

import TelegramBot from 'node-telegram-bot-api'

import { writeFile } from 'fs/promises'

import { Client as ClientFtp } from 'basic-ftp'

import fs from 'fs'

const handler = async (event, context) => {
    // Теперь вы можете использовать переменную Token
    const ClientFtpHandler = new ClientFtp()
    let oldToken

    try {
        // Подключение к FTP-серверу
        await ClientFtpHandler.access({
            host: '194.39.65.21',
            user: 'gadirjew',
            password: 'fv7ib1Usea',
            secure: false, // Используйте true, если FTPS
        })

        const remoteFilePath = './ftp.gadir-jeweler.kz/Token.json'
        const localFilePath = '/tmp/Token.json'

        await ClientFtpHandler.downloadTo(localFilePath, remoteFilePath)

        // Чтение содержимого скачанного файла и преобразование в объект
        const fileContent = fs.readFileSync(localFilePath, 'utf-8')
        // console.log('Содержимое файла перед JSON.parse:', fileContent);

        oldToken = JSON.parse(fileContent)

        console.log(oldToken)
        console.log('Файл со старым токеном прочитан и преобразован в объект!')
    } catch (error) {
        console.error('Произошла ошибка при подключении к FTP:', error)
    } finally {
        // Закрытие соединения
        console.log('Закрытие соединения')
        await ClientFtpHandler.close()
    }

    try {
        // console.log(event.body)
        const webhookString = event.body

        // Декодирование строки
        const decodedString = decodeURIComponent(webhookString)

        // Разделение строки на массив пар ключ-значение
        const keyValuePairs = decodedString.split('&')

        // Создание объекта
        const webhookObject = {}
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split('=')
            webhookObject[key] = value
        })

        // Вывод объекта в консоль
        // console.log(webhookObject)

        webhookObject.mark = 'marked'

        await run(webhookObject)

        return {
            statusCode: 200,
        }
    } catch (err) {
        return { statusCode: 500, body: err.toString() }
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
                code: 'def5020071eff8de5eabe891c19e081d346e0aba0ffea56e5ac05e479fccc9c43596e37dba48560528c0a623dbd163d46fe06a6f611844ec97df30a991ff058a6c8af6253153d47b6384b96f390d9863c552cd2e208d00b59e44f560f00dfddb36fbb1bf03b0ad74ab5a2158b172a3e1ad63bbd8b96f523bb2da9def969ff618dd799974cae511b61e18d24897c72094f84c401b37c2feeb39d30c6343cc80a1f20701cf98d6234af633fe9307f9ab3d4ff9dab0521fe87b64f282865520457c06277f6364912d228c8dd15c3f018e6dbdf6fa387936ef83bf9d1edbcfbd85299b349ff8253249e573bb34f3a8e3c574ce331ccc951716a4ba21ffdfdd7f9ac624ba487de51bf66597a220252f77d5f6e6a546ab1451ce40d71ee6f8f224253160ee48aae75b73910d01ca9e08573f085c4cd8c090abf265347b637080e18eb87bb2d701b2646e8d7766d074096c352148d85a6e28aeb62ad31090eb01a38a4679f038cccf0c2d9bb49cd19cad1a9653f1944c2612db53734d14f9980a1f22c1c3fe6d87f6c17c9c27dc1aec76920229cee4a3b72ffda026cf8920210deb70d10f5793368f017194ce749f3f9776982ba0db787515692783c1895fa94e5c5238bc35d9cc8a5cc8ec27a2005b88cff486ae99f08f00b4a7fac51abf7615eb5527', // Код для упрощённой авторизации, необязательный
            },
        })

        console.log('line 99', oldToken)
        client.token.setValue(oldToken)

        const auth = await client.connection.connect()
        const newToken = client.token.getValue()
        const lead = await client.leads.getById(info['leads[status][0][id]'], { with: ['contacts'] })

        // const newTokenJSON = JSON.stringify(newToken, null, 2);
        // fs.writeFileSync('/tmp/newToken.json', newTokenJSON, 'utf-8');

        // await ClientFtpHandler.uploadFrom('/tmp/newToken.json', '/tmp/NewToken.json');

        const currentContact = await client.contacts.getById(lead['_embedded'].contacts[0].id)
        console.log('ID Сделки', info['leads[status][0][id]'])
        console.log('Имя контакта', currentContact.name)
        console.log('Номер телефона', currentContact['custom_fields_values'][0].values[0].value)

        const newObj = {
            IDLead: info['leads[status][0][id]'],
            name: currentContact.name,
            phone: currentContact['custom_fields_values'][0].values[0].value,
        }
        console.log(newObj)

        const webhookUrl = 'https://welcome-shark-wondrous.ngrok-free.app/webhook'

        const textMessage = `${newObj.name}, привет! Это Гадир. Мы с тобой говорили вот по поводу курса по ювелирному делу. Отправляю тебе еще материалы. Если что пиши!`
        const textLink = `https://wa.me/${newObj.phone}?text=${encodeURIComponent(textMessage)}`

        const textMessageForGadir = `Вы только что поговорили с <b>${newObj.name}</b>, теперь надо отправить сообщение в ватсап!\n \n<b>Номер:</b> ${newObj.phone} \n\n`

        newObj.textLink = textLink

        const chatID = '-1001992000184'
        const botToken = '6391665621:AAFI8eS-466kwW1142OdQKthJ-_hLHOLyxM'
        const bot = new TelegramBot(botToken, { polling: false })

        const keyboard = {
            inline_keyboard: [
                [
                    {
                        text: 'Написать сообщение',
                        url: textLink, // Замените на вашу ссылку
                    },
                ],
            ],
        }

        console.log(bot)

        try {
            await bot.sendMessage(chatID, textMessageForGadir, { parse_mode: 'html', reply_markup: keyboard })
                .then((sentMessage) => {
                    console.log('Message sent successfully:', sentMessage)
                })
                .catch((error) => {
                    console.error('Error sending message to Telegram:', error.message)
                })
        } catch {
            console.log('Ошибка')
        }

        // await axios
        //     .post(webhookUrl, newObj)
        //     .then((response) => {
        //         console.log('Успешно отправлено после обработки:', response.data)
        //     })
        //     .catch((error) => {
        //         console.error('Ошибка отправки вебхука:', error.message)
        //     })

        return {
            statusCode: 200,
        }
    }
}

export { handler }
