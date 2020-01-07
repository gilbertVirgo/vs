const sms = require("./sms");
const getDayOfYear = require('date-fns/get_day_of_year');
const {exec} = require("child_process");

const dispatch = ({verses, profiles}) => {
    const day = getDayOfYear(new Date());
    const verse = verses[day];
    //const body = `${verse}\n\nhttp://vs.gilbertvirgo.com`;

    profiles.forEach(({useSMS, phone, email}) => {
        // if(useSMS) {
        //     sms.send({to: phone, body})
        // } else {
        //     // TODO: email
        // }

        exec(`bash ${__dirname}/dispatch.sh ${verse}`);
    });
}

const init = async ({verses, profiles}) => {
    const lengthMS = getLengthOfYear();

    // Test
    //dispatch({verses, profiles});

    setTimeout(() => {
        setInterval(() => dispatch({verses, profiles}), lengthMS / verses.length);
    }, getMSUntilNextTick());
}

module.exports = {init};