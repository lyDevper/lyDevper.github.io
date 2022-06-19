var q = (id) => document.getElementById(id);

// wait for milliseconds
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e9; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function shuffle(list) {
  var newList = [];
  while (list.length > 0) {
    newList.push(list.splice(randInt(0, list.length - 1), 1)[0]);
  }
  return newList;
}

function genId() {
  return Math.random().toString(36).substr(2, 9);
  //return Date.now();
}

//using chroma.js to get color scale
function colorBetweenNum(colors, num1, num2, atNum) {
  var scaler = chroma.scale(colors).mode('lab').domain([num1, num2]).out(['hex', 'rgb']);
  return scaler(atNum);
}

class TimeDelta {
  //get input in form of msValue or h, m, s ot 'hh:mm:ss'
  constructor(arg0, arg1, arg2) {
    if(typeof arg0 == 'number') {
      this.msValue = arg0;
      this.compute();
    }
    else if(typeof arg0 == 'string') {
      if(arg0.indexOf(':') != -1)
        this.setByString(arg0);
    }
    if(arguments.length == 3) {
      this.setByhms(arg0, arg1, arg2);
    }
  }

  //string in format "hh:mm:ss" or "hh:mm:ss:ms"
  setByString(str) {
    let [hours, minutes, seconds] = str.split(':').map(s => parseInt(s));
    this.msValue = (hours * 3600 + minutes * 60 + seconds) * 1000;
    this.compute();
  }

  setByhms(h, m, s) {
    this.msValue = (h * 3600 + m * 60 + s) * 1000;
    this.compute();
  }

  setByValue(ms) {
    this.msValue = ms;
    this.compute();
  }

  //return format 'hh:mm:ss', and make so that each value is 2 digits
  toString() {
    let str = `${this.hours}:${this.minutes}:${this.seconds}`;
    let arr = str.split(':');
    for(let i = 0; i < arr.length; i++)
      arr[i] = arr[i].length == 1 ? '0' + arr[i] : arr[i];
    return arr.join(':');
  }

  //return format 'hh:mm:ss.ms', and make so that each value is 2 digits
  toString2() {
    let centiseconds = Math.floor(this.milliseconds / 10);
    centiseconds = centiseconds.toString();
    centiseconds = centiseconds.length == 1 ? '0' + centiseconds : centiseconds;
  
    let str = `${this.hours}:${this.minutes}:${this.seconds}:${centiseconds}`;
    let arr = str.split(':');
    for(let i = 0; i < arr.length; i++)
      arr[i] = arr[i].length == 1 ? '0' + arr[i] : arr[i];
    return arr.join(':');
  }

  compute() {
    this.milliseconds = this.msValue;
    this.seconds = Math.floor(this.milliseconds / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);
    this.months = Math.floor(this.days / 30);
    this.years = Math.floor(this.months / 12);

    this.milliseconds = this.milliseconds % 1000;
    this.seconds = this.seconds % 60;
    this.minutes = this.minutes % 60;
    this.hours = this.hours % 24;
    this.days = this.days % 30;
    this.months = this.months % 12;
  }

  adds(other) {
    this.msValue += other.msValue;
    this.compute();
  }

  subtracts(other) {
    this.msValue -= other.msValue;
    this.compute();
  }

  equals(other) {
    return this.msValue == other.msValue;
  }
}
