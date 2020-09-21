const dialogflow = require('dialogflow');

const configs = require('./dio-bot-fit'); // # Arquivo com as configs de variáveis para acesso no DialogFlow

// Criar Session para o DialogFlow
const sessionClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});

async function sendMessage(chatId, message) {
    const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'pt-BR'
            }
        }
    }

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    //console.log(JSON.stringify(result, null, 2));

    return {
        text : result.fulfillmentText,
        intent: result.intent.displayName,
        fields: result.parameters.fields
    };
};

// sendMessage('4542454-ADF', 'Olá Bot, tudo bem com você?');

module.exports.sendMessage = sendMessage;