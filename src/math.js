/*jshint esversion: 6, node: true, undef: true*/
/**
* Converts the dateformat dd-mm-yyyy hr:mi:se into seconds (only the time)
*
* @author: Michiocre
* @param {string} date The date in "dd-mm-yyyy hr:mi:se" format
* @return {int} The time in seconds
*/
function dateConvert(date) {
    let time = date.split(" ")[1];
    return (time.split(":")[0] * 3600) + (time.split(":")[1] * 60) + (time.split(":")[2] * 1);
}

/**
* Compare function for array.sort
* Compares the date values of two objects, if a < b then -1, if a > b then 1
*
* @author: Michiocre
* @param {object} a One index of an array
* @param {object} b Another index of an array
* @return {int}
*/
function dateCompare(a, b) {
    if (Date.parse(a.date) < Date.parse(b.date)) {
        return -1;
    }
    if (Date.parse(a.date) > Date.parse(b.date)) {
        return 1;
    }
    return 0;
}

/**
* Calculates the average time of the day, from an array of plays.
*
* @author: Michiocre
* @param {array} top Array of plays
* @return {int} Average time of the day when play was made
*/
function timeAverage(top) {
    let diff = 0;
    let time1 = dateConvert(top[0].date);

    for (var i = 1; i < top.length; i++) {
        let time = dateConvert(top[i].date);

        let localdiff = time - time1;

        if (localdiff >= 43200) { //If the difference is greater then 12hr
            localdiff = (localdiff - 86400);
        } else if (localdiff < -43200) {
            localdiff = (localdiff + 86400);
        }

        diff += localdiff;
    }

    let normDiff = diff/top.length;

    let avr = time1 + normDiff;
    if (avr < 0) {
        avr = 86400 + avr;
    }
    return avr;
}

/**
* Calculates all the average time of the day, from an array of plays. (Average using only the first play, the first 2, the first 3, ...)
*
* @author: Michiocre
* @param {array} top Array of plays
* @return {array} all the average times of the day when play was made
*/
function allTimeAverage(top) {
    let averages = [];
    let localtop = [];

    for (var i = 0; i < top.length; i++) {
        localtop.push(top[i]);
        averages.push(timeAverage(localtop));
    }
    return averages;
}


module.exports = {
    timeAverage: timeAverage,
    allTimeAverage: allTimeAverage,
    dateCompare: dateCompare,
    dateConvert: dateConvert
};
