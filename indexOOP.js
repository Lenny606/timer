//define class Timer

class Timer {
    constructor() {
        this.name = 'timer';
        this.timer = undefined;
        this.h = 0
        this.m = 0
        this.s = 0

        this.onUpdateCallback = undefined
        this.onStopCallback = undefined
    }

    update() {
        if (0 === this.h && 0 === this.m && 0 === this.s) {
            this.stop();
            return;
        } else if (0 === this.s) {
            this.s = 59;
            if (0 === this.m) {
                this.m = 59;
                this.h = this.h - 1;
            } else {
                this.m = this.m - 1;
            }
        } else {
            this.s = this.s - 1;
        }

        this.show();
        if (0 === this.h && 0 === this.m && 0 === this.s) {
            this.stop();
        }

        // call the external callback function if it exists
        if (this.onUpdateCallback && typeof this.onUpdateCallback === 'function') {
            this.onUpdateCallback();
        }
    }

    start() {
        if (this.timer) {
            console.log(`[${this.name}] started`);
            return;
        }
        console.log(`[${this.name}] starts`);
        this.timer = setInterval(() => {
            this.update();
        }, 1000);
        this.show();
    }

    pause() {
        console.log(`[${this.name}] paused`);
        clearInterval(this.timer);
        this.timer = undefined;
    }

    stop() {

        console.log(`[${this.name}] stopped`);
        clearInterval(this.timer);
        this.timmer = undefined;

        // smiliar to update, check for the stop callback function
        if (this.onStopCallback && typeof this.onStopCallback === 'function') {
            this.onStopCallback();
        }

    }

    show() {
        console.log(`[${this.name}] current time: ${this.h}:${this.m}:${this.s}`);
    }
}

const t = new Timer()
console.log(t)
const list_timer = [];

function startCounting(i) {
    // get the input value
    const inputh = document.getElementById(`inputh`);
    const inputm = document.getElementById(`inputm`);
    const inputs = document.getElementById(`inputs`);

    // set the state of input fields and buttons
    domUpdate(i, "COUNTING");
    // take the corresponding timer from the timer array
    const tmr = list_timer[i - 1];
    // assign the input value to timer
    tmr.h = Number(inputh.value);
    tmr.m = Number(inputm.value);
    tmr.s = Number(inputs.value);

    // set the callback function
    tmr.onStopCallback = () => {

        // set the state of input fields and buttons
        domUpdateInputs(i, "STOPPED");
    }
    tmr.onUpdateCallback = () => {
        domUpdateTimer(i);
    }
    // start the timer
    tmr.start();
}