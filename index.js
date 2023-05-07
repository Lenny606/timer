//non OOP aproach 

document.getElementById("btn-pause").disabled = true; //disabled btn at start 
document.getElementById("btn-stop").disabled = true;

//global variables
let timer = null;
let h = 0;
let m = 0;
let s = 0;

//validates for time format 24:59:59
var inputh = document.getElementById("inputh");
inputh.addEventListener("input", function () {
    inputh.value = parseInt(inputh.value || 0);  //parses string to Integer / defaultly converts to decimal
    if (inputh.value > 24) inputh.value = 24;
    if (inputh.value < 0) inputh.value = 0;
});

var inputm = document.getElementById("inputm");
inputm.addEventListener("input", function () {
    inputm.value = parseInt(inputm.value || 0);
    if (inputm.value > 59) inputm.value = 59;
    if (inputm.value < 0) inputm.value = 0;
});

var inputs = document.getElementById("inputs");
inputs.addEventListener("input", function () {
    inputs.value = parseInt(inputs.value || 0);
    if (inputs.value > 59) inputs.value = 59;
    if (inputs.value < 0) inputs.value = 0;
});

//start the timer
function startCounting() {
    h = document.getElementById("inputh").value || h;       //sets the values
    m = document.getElementById("inputm").value || m;
    s = document.getElementById("inputs").value || s;
    console.log(h)

    if (h === 0 && m === 0 && s === 0 || (h < 0 || m < 0 || s < 0)) {   //validation for input
        document.getElementById("currentTime").innerHTML = "Illegal number!!";
        document.getElementById("currentTime").style.color = "red"
        return;
    }

    timer = setInterval(counting, 1000)  //counting function is updated every one second

    document.getElementById("btn-start").disabled = true;  //disables inputs except for stop/pause
    document.getElementById("btn-pause").disabled = false;
    document.getElementById("btn-stop").disabled = false;
    document.getElementById("inputh").disabled = true;
    document.getElementById("inputm").disabled = true;
    document.getElementById("inputs").disabled = true;
}

function pauseCounting() {

    document.getElementById("btn-start").disabled = false;  //changes inputs and btns 
    document.getElementById("btn-pause").disabled = true;
    document.getElementById("btn-stop").disabled = false;
    document.getElementById("inputh").disabled = false;
    document.getElementById("inputm").disabled = false;
    document.getElementById("inputs").disabled = false;

    clearInterval(timer) //pause
}

function endCounting() {

    document.getElementById("btn-start").disabled = false;  //changes inputs and btns 
    document.getElementById("btn-pause").disabled = true;
    document.getElementById("btn-stop").disabled = true;
    document.getElementById("inputh").disabled = false;
    document.getElementById("inputm").disabled = false;
    document.getElementById("inputs").disabled = false;

    clearInterval(timer) //pause

    h = 0;  //reset values
    m = 0;
    s = 0;
    document.getElementById("currentTime").innerHTML = "Timer stopped";
    document.getElementById("inputh").value = 0;
    document.getElementById("inputm").value = 0;
    document.getElementById("inputs").value = 0;
}

function counting() {
    if (s === 0) {  //if second is 0
        if (m === 0) {  //if minute is 0
            h--;
            m = 59;
            s = 59;
        } else {
            m--;
            s = 59;
        }
    } else {
        s--;
    }

    // display current time
    document.getElementById("currentTime").innerHTML = "current time: " + h + " h " + m + " m " + s + " s";
    document.getElementById("inputh").value = h;
    document.getElementById("inputm").value = m;
    document.getElementById("inputs").value = s;


    // end of countdown
    if (s == 0) {
        // when the second is 0, check if the minute is 0
        if (m == 0) {
            // when the minute is 0, check if the hour is 0
            if (h == 0) {

                // stop the timer
                endCounting();
                // execute popup in the next event loop to prevent it from blocking DOM rendering
                setTimeout(function () {
                    // alert("The time is up!");
                }, 0);
                return;
            }
        }
    }

}