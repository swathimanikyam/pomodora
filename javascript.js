let start = document.querySelector("#start");
let shortBreak = document.querySelector("#shortBreak");
let longBreak = document.querySelector("#longBreak");
let body = document.querySelector("body");
let count = 0;
let pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  init: function () {
    let self = this;
    this.minutesDom = document.querySelector("#minutes");
    this.secondsDom = document.querySelector("#seconds");
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    start.onclick = function () {
      self.startStart.apply(self);
      start.classList.add("border");
      shortBreak.classList.remove("border");
      longBreak.classList.remove("border");
      body.style.backgroundColor = "#FFFF33";
    };
    shortBreak.onclick = function () {
      self.startShortBreak.apply(self);
      start.classList.remove("border");
      shortBreak.classList.add("border");
      longBreak.classList.remove("border");
      body.style.backgroundColor = "#3399FF";
      count++;
    };
    longBreak.onclick = function () {
      self.startLongBreak.apply(self);
      start.classList.remove("border");
      shortBreak.classList.remove("border");
      longBreak.classList.add("border");
      body.style.backgroundColor = "#00FFFF";
    };
    document.querySelector("#stop").onclick = function () {
      self.stopTimer.apply(self);
      start.classList.remove("border");
      shortBreak.classList.remove("border");
      longBreak.classList.remove("border");
      body.style.backgroundColor = "#FF66B2";
    };
  },
  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },
  startStart: function () {
    this.resetVariables(25, 0, true);
  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
  },
  stopTimer: function () {
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },
  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        if (
          body.style.backgroundColor == "rgb(75, 90, 126)" &&
          (count < 4 || count % 4 != 0)
        ) {
          playAudio();
          shortBreak.click();
        } else if (
          body.style.backgroundColor == "rgb(75, 90, 126)" &&
          count % 4 == 0
        ) {
          playAudio();
          longBreak.click();
        } else if (body.style.backgroundColor == "rgb(179, 69, 64)") {
          playAudio();
          start.click();
        } else if (body.style.backgroundColor == "rgb(75, 122, 75)") {
          playAudio();
          start.click();
        } else {
          alert("ERROR");
          console.error("ERROR");
        }
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete: function () {
    this.started = false;
  },
};
window.onload = function () {
  pomodoro.init();
};