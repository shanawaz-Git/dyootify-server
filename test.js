const currentTime = new Date();
const offset = new Date().getTimezoneOffset();
const ISTOffset = 330;
const ISTTime = new Date(currentTime.getTime() + (ISTOffset + offset) * 60000);
var dateIST = ISTTime.getDate();
var monthIST = ISTTime.getMonth() + 1;
var hoursIST = ISTTime.getHours();
var minutesIST = ISTTime.getMinutes();
console.log(monthIST);
