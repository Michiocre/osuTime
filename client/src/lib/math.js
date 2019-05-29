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
    let angles = [];

    for (let i = 0; i < top.length; i++) {
        let seconds = dateConvert(top[i].date);
        angles.push(seconds/240);
    }

    let sinSum = 0;
    let cosSum = 0;
    for (let i = 0; i < angles.length; i++) {
        sinSum += Math.sin(angles[i] * Math.PI / 180);
        cosSum += Math.cos(angles[i] * Math.PI / 180); 
    }

    let angle = Math.atan2(sinSum / angles.length, cosSum / angles.length) * 180 / Math.PI;

    if (angle < 0) {
        angle += 360;
    }

    return angle * 240;
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
