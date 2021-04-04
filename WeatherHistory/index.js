const axios = require('axios');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

module.exports = async function (context, req) {
    context.log('WeatherHistory v1.0.0');
    try {
        const vaultName = 'TBB-KeyVault-001';
        const vaultUrl = `https://${vaultName}.vault.azure.net`;

        const credential = new DefaultAzureCredential();
        const client = new SecretClient(vaultUrl, credential);
        const secretName = 'visual-crossing-api-key';
        const latestSecret = await client.getSecret(secretName);
        const specificSecret = await client.getSecret(secretName, { version: latestSecret.properties.version });

        var visualCrossingOptions = {
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
                'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
                'x-rapidapi-key': specificSecret.value, 
            }
        };

        const { data }= await axios.request(visualCrossingOptions);
        return { body: data };

    } catch (e) {
        return { body: 'Failure' };
    }
}