const getDayOfYear = require('date-fns/getDayOfYear');
const differenceInMilliseconds = require("date-fns/differenceInMilliseconds");
const {exec} = require("child_process");

const dispatch = ({verses}) => {
    const day = getDayOfYear(new Date());
    const verse = verses[day];
    
    exec(`bash ${__dirname}/dispatch.sh "${verse}"`, (error, stdout, stderr) => {
        if(error) {
            console.log(error);
        } else {
            console.log(stdout);
        }
    });
    console.log(`Verse dispatched... (${verse})`);
}

const init = async ({verses}) => {
    const delay = () => {
        let today = new Date();
        let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 6);

        return differenceInMilliseconds(tomorrow, today);
    }

    setTimeout(() => {
        setInterval(() => {
            console.log(delay());
            dispatch({verses})
        }, delay());
    }, delay());

    dispatch({verses});
}

module.exports = {init};