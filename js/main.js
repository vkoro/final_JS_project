
let userAgent = navigator.userAgent.split(";");
let device = userAgent[0].split("(");
let os = device[1];

let version = navigator.userAgent.split("/");
let versionB = version[3].split(" ")
let browserVer = versionB[0]

let operationSystem = document.querySelector(".os");
operationSystem.innerHTML = os ;

function browser() {
    let ua = navigator.userAgent;

    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/Konqueror/) > 0) return 'Konqueror';
    if (ua.search(/Iceweasel/) > 0) return 'Debian Iceweasel';
    if (ua.search(/SeaMonkey/) > 0) return 'SeaMonkey';
    if (ua.search(/Gecko/) > 0) return 'Gecko';
    return 'Search Bot';
}

let br = browser()

let userBrowser = document.querySelector(".browser");
userBrowser.innerHTML = br + " " + browserVer

