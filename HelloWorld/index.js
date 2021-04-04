const axios = require('axios').default;
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');


module.exports = async function foo(context) {

    const { name } = context.bindingData;

    let step = 'create client';

    try {
        const credential = new DefaultAzureCredential();

        const vaultName = 'TBB-KeyVault-001';
        const url = `https://${vaultName}.vault.azure.net`;

        const client = new SecretClient(url, credential);
        const secretName = 'visual-crossing-api-key';

        step = 'latest secret'
        const latestSecret = await client.getSecret(secretName);
        console.log(`Latest version of the secret ${secretName}: `, latestSecret);

        step = 'specific secret'
        const specificSecret = await client.getSecret(secretName, { version: latestSecret.properties.version });
        console.log(`The secret ${secretName} at the version ${latestSecret.properties.version}: `, specificSecret);

        var options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/history',
            params: {
                startDateTime: '2019-01-01T00:00:00',
                aggregateHours: '24',
                location: 'Earlysville, VA ,USA',
                endDateTime: '2019-01-03T00:00:00',
                unitGroup: 'us',
                dayStartTime: '8:00:00',
                contentType: 'json',
                dayEndTime: '17:00:00',
                shortColumnNames: '0',
            },
            headers: {
                'x-rapidapi-key': 'd4aaa9c8edmsh5b2254e9a0569b8p1110eejsn98df5d69001a',
                // 'x-rapidapi-key': process.env['VisualCrossingAPIKey'],
                'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
            }
        };

        step = 'Call service';

        axios.request(options).then(function (response) {
            console.log('Response', response.data);
            context.done(null, { body: response.data });
        }).catch(function (error) {
            context.done(null, { body: `TBB: error.message ${process.env['VisualCrossingAPIKey']}` });
        });
    } catch (e) {
        context.done(null, { body: `TBB Exception: ${step} ${JSON.stringify(e)}` });
    }

};
