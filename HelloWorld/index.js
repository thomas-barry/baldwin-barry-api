const axios = require("axios").default;

module.exports = function foo(context) {

  const { name } = context.bindingData;

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
            shortColumnNames: '0'
        },
        headers: {
            'x-rapidapi-key': 'd4aaa9c8edmsh5b2254e9a0569b8p1110eejsn98df5d69001a',
            'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log('Response', response.data);
        context.done(null, { body: response.data });
    }).catch(function (error) {
        context.done(null, { body: error.message });
    });

};


