const getDayOfYear = require('date-fns/getDayOfYear');
const differenceInMilliseconds = require("date-fns/differenceInMilliseconds");
const {exec} = require("child_process");

const dispatch = ({verses}) => {
    const day = getDayOfYear(new Date());
    const verse = verses[day];

    exec(`bash ${__dirname}/dispatch.sh ${verse}`);
}

const init = async ({verses, profiles}) => {
    const delay = () => {
        let today = new Date();
        let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 6);

        return differenceInMilliseconds(today, tomorrow);
    }

    setTimeout(() => {
        setInterval(() => dispatch({verses, profiles}), delay());
    }, delay());
}

module.exports = {init};