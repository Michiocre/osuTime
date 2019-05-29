/**
* Converts the dateformat dd-mm-yyyy hr:mi:se into seconds (only the time)
*
* @author: Michiocre
* @param {string} date The date in "dd-mm-yyyy hr:mi:se" format
* @return {int} The time in seconds
*/
function dateConvert(date) {
    let time = date.split(' ')[1];
    let splits = time.split(':');
    return (splits[0] * 3600) + (splits[1] * 60) + (splits[2] * 1);
}

/**
* Generate a compare function for an array of objects
* Returns a function that compares a given object (date is a special case)
*
* @author: Michiocre
* @param {string} property property of the object
* @return {function}
*/
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    if (property === 'date') {
        return function(a, b) {
            let result = 0;
            if (Date.parse(a[property]) < Date.parse(b[property])) {
                result = -1;
            }
            if (Date.parse(a[property]) > Date.parse(b[property])) {
                result = 1;
            }
            return result * sortOrder;
        };
    } else {
        return function(a, b) {
            let result = 0;
            if (a[property] < b[property]) {
                result = -1;
            }
            if (a[property] > b[property]) {
                result = 1;
            }
            return result * sortOrder;
        };
    }
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

        if (localdiff > 43200) { //If the difference is greater then 12hr
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
    if (avr >= 86400) {
        avr = avr - 86400;
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
    dynamicSort: dynamicSort,
    dateConvert: dateConvert
};
