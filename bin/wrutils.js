'use strict';

//returns pretty UTC time
exports.getdatetime = function() {
      return  new Date().toISOString().
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '')    // delete the dot and everything after
}

exports.validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


//Expected Input: <mailto:info@fezzee.com|info@fezzee.com>
//strips the mailto and friendly name leavng just the address
exports.getEmail = function(str) {
    if(str.indexOf('mailto') === -1)
          return str.toLowerCase();
    str = str.split(':');
    str = str[1].split('|');
    return str[0];
}


//String.prototype.toHHMMSS =
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}


exports.get_uptime = function () {
  var time = process.uptime();
  var uptime = (time + "").toHHMMSS();
  //console.log("Uptime: " + uptime);
  return uptime;
}
