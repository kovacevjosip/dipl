var maxTime = 1000;

var evenPow = function (num, callback) {
    // set waitTime to random number (max 1s)
    var waitTime = Math.floor(Math.random() * (maxTime + 1));
    setTimeout(function () {
        if (num % 2) {
            callback(new Error("Odd input"));
        } else {
            callback(null, Math.pow(num, 2), waitTime);
        }
    }, waitTime);
};

var handleResult = function (err, result, time) {
    if (err) {
        console.log("ERROR: " + err.message);
    } else {
        console.log("The results are: " + result + " (" + time + " ms)");
    }
};

evenPow(4, handleResult);
evenPow(1, handleResult);
evenPow(6, handleResult);

console.log("------");