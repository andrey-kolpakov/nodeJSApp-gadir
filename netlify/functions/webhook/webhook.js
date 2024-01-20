exports.handler = async (event, context) => {
    try {
        console.log(event.body)
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
        console.log(webhookObject)

        return {
            statusCode: 200,
        }
    } catch (err) {
        return { statusCode: 500, body: err.toString() }
    }
}
