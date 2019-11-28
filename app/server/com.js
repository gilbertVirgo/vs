const sms = require("./sms");
//sms.test();

const getLengthOfYear = () => {
    const now = new Date();
    const firstMS = (new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)).getTime();
    const lastMS = (new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)).getTime()
    const lengthMS = lastMS - firstMS;

    return lengthMS;
}

const getPerc = () => {
    const now = new Date();
    const firstMS = (new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)).getTime();
    const lengthMS = getLengthOfYear();

    return Math.floor(((now.getTime() - firstMS) / lengthMS) * 100);
}

const dispatch = ({verses, profiles}) => {
    const perc = getPerc();
    const ref = verses[perc * (verses.length / 100)];

    const body = `${ref}\n\nhttp://vs.gilbertvirgo.com`;

    profiles.forEach(({useSMS, phone, email}) => {
        if(useSMS) {
            sms.send({to: phone, body})
        } else {
            // TODO: email
        }
    });
}

const init = async ({verses, profiles}) => {
    const lengthMS = getLengthOfYear();

    dispatch({verses, profiles});

    setTimeout(() => dispatch({verses, profiles}), lengthMS / verses.length);
}

module.exports = {init};