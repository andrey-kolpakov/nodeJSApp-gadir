import { Client } from 'amocrm-js'
import { Token } from './Token.mjs'
import fs from 'fs/promises'

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
        code: 'def502001b6b26a6835c66cc32fc41d5aed69f31553b5cdfb916a9a8e08d3a055d6d6ed4b493556cc99cc7151979a5a270bacfc0c929f88bcb6a3161264d8ec50f941580960deb7fc2c089f0f2adc46e9cc69d69af10364228295a0a0cb492a761ee90284a85dd8539c1f359b3e10eab8a78191a78e9157cf372059bfec7adf57d523413f081731feb002859302422f390c550a788e68dce55a9c7ce3e1b56949b774cc313a0bd8e31553d4262d2a56703ca4caa8e0ea67aef6304b90f9da04ba58c63995a66d44797722425ad0c8835473fed9f1e8ea5fa153946bbaae8d1493f5159b3f99b2bd5de3235a4a58dd3c44ed1069f95ab0d231ec7a65b8cf0f5ae43317363229b9c167c20c2a2eed16effde6635b427c98de88814be8008c572cf5a6f67c90e1efea27df03e67de60beda9d8e9109b0283518b4176d470d1ef29f8104b5cafe2f38d988f1a6efddb98c83985643705609b86b1d0238b55e56a31f2dbe49d2375a48d3c1057f5e46e06d5b55a86e873bcc0b41e6ebb8abdb823c51bf49f197bc63efcd8e1042769d1f0cac69f18fa43b9605808669635966aac52fd871e0347c7e1c9b5177ed93bf4e877bffdf094478bb52d37100af7681c752de97542a2479fd3a0467a57c76c340635d44ac49e4d865d7e263e08767924c3eb3', // Код для упрощённой авторизации, необязательный
    },
})

client.token.setValue(Token);
export default client