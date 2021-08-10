class ElementMakerHTML {
  constructor(elementType, text, parentElement, id, className, placeholder) {
    this.ele = document.createElement(elementType);
    this.textNode = document.createTextNode(text);
    this.ele.appendChild(this.textNode);
    this.parentElement = document.getElementById(parentElement);
    this.ele.id = id;
    this.ele.className = className;
    this.ele.placeholder = placeholder;
  }

  appendElementToDOM() {
    this.parentElement.appendChild(this.ele);
  }
}

class DateMaker {
  constructor(days) {
    this.now = new Date();
    this.now.setDate(this.now.getDate() + days);
    this.now = this.now.toDateString();
  }
}

let user;

class Hours {
  constructor() {
    this.JS101 = { hours: [190, 149, 307, 113, 102, 165, 78] };
    this.JS120 = { hours: [115, 175, 85, 131, 63, 87, 95, 90] };
    this.JS130 = { hours: [55, 80, 155, 69, 60, 36, 50, 58] };
    this.JS170 = { hours: [30, 26, 30, 38, 17, 35, 37, 9] };
    this.JS175 = { hours: [30, 73, 90, 58, 24, 76, 35, 52] };
    this.JS180 = { hours: [83, 49, 48, 58, 25, 27, 51, 51] };
    this.JS185 = { hours: [8, 10, 15, 15, 7, 12, 10, 16] };
    this.LS202 = { hours: [78, 55, 160, 46, 92, 38] };
    this.LS215 = { hours: [75, 66, 60, 105, 52, 89, 77, 73] };
    this.LS230 = { hours: [212, 245, 91, 187, 187, 192, 172, 136] };
    this.getMaxOfCourse();
    this.getBackendAvg();
    this.getMaxTotal();
    this.addCourseListToDOM();
    this.addAvgToDom();
    this.addMaxToDom();
  }

  getMaxOfCourse() {
    for (let prop in this) {
      if (this[prop]) this[prop].max = Math.max(...this[prop].hours);
    }
  }

  getMaxTotal() {
    let max = 0;
    for (let prop in this) {
      if (this[prop]) {
        if (this[prop].max) {
          max += this[prop].max;
        }
      }
    }

    this.BackendMax = max;
  }

  getBackendAvg() {
    let courseAvg = 0;
    for (let prop in this) {
      if (this[prop]) {
        this[prop].average = Math.round(this[prop].hours
          .reduce((acc, num) => acc + num) / this[prop].hours.length);
        courseAvg += this[prop].average;
      }
    }

    this.BackendAverage = courseAvg;
  }

  addCourseListToDOM() {
    for (let prop in this) {
      if (this[prop]) {
        if (this[prop].average) {
          let text = `${prop} takes on average ${this[prop].average
          } hours to complete and the max on record is ${this[prop].max}.`;

          let li = new ElementMakerHTML('li', text, 'list');
          li.appendElementToDOM();
        }
      }
    }
  }

  addAvgToDom() {
    let avgText = `The average time to finish the JavaScript track is: ${
      this.BackendAverage} hours.`;
    let li = new ElementMakerHTML('li', avgText, 'list');
    li.appendElementToDOM();
  }

  addMaxToDom() {
    let maxText = `The maximum time on record to finish the JavaScript track is: ${
      this.BackendMax} hours.`;
    let li2 = new ElementMakerHTML('li', maxText, 'list');
    li2.appendElementToDOM();
  }

  computeMoreAccurate(js109Hours) {
    let comparedToAvgJS109 = js109Hours / this.JS101.average;
    this.addYourComputedAvgEstimateToDOM(comparedToAvgJS109);
  }

  addYourComputedAvgEstimateToDOM(comparedToAvgJS109) {
    let hoursLeft = Math.round(this.BackendAverage * comparedToAvgJS109) - user.done;
    let weeksLeft = Math.ceil(hoursLeft / user.hours);
    let date = new DateMaker(weeksLeft * 7);
    let yourAvgText = `Based on your input it will probably take you another ${hoursLeft
      } hours or ${weeksLeft} weeks. This means that you would finish on ${date.now}.`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'list');
    yourAvgEle.appendElementToDOM();
  }
}

let launchSchoolHours = new Hours();


class UserInput {
  constructor() {
    this.hours = this.getHoursPerWeek();
    this.done = this.getTotalHoursDone();
    this.total = launchSchoolHours.BackendAverage - this.done;
    this.maxTotal = launchSchoolHours.BackendMax - this.done;
    this.avgWeeks = Math.round((this.total / this.hours));
    this.maxWeeks = Math.round((this.maxTotal / this.hours));
  }

  getHoursPerWeek() {
    return Number(document.getElementById('hoursperweek').value);
  }

  getTotalHoursDone() {
    return Number(document.getElementById('hoursdone').value);
  }

  addYourAvgToDOM(date) {
    let yourAvgText = `Based on the average it will probably take you another ${
      this.total} hours or ${this.avgWeeks} weeks. This means that you would finish on ${date.now}`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'list');
    yourAvgEle.appendElementToDOM();
  }

  addYourMaxEstimateToDOM(maxDate) {
    let yourMaxText = `Based on the maximum time on record it could take you another ${
      this.maxTotal} hours or ${this.maxWeeks} weeks. This means that you would finish on ${maxDate.now}`;
    let yourMaxEle = new ElementMakerHTML('li', yourMaxText,'list');
    yourMaxEle.appendElementToDOM();
  }

  addMoreAccurateToDom() {
    let moreAccurateText = `If you want a more accurate estimate and have finished JS109, write how many hours it took you here:`;
    let li2 = new ElementMakerHTML('li', moreAccurateText, 'list', 'js120hours');
    li2.appendElementToDOM();
    let inputDiv = new ElementMakerHTML('div', '', 'list', 'inputDiv');
    inputDiv.appendElementToDOM();
    let input = new ElementMakerHTML('input', '', 'inputDiv', 'numberInput', '', "If you don't know, multiply avg hours per week by weeks spent studying.");
    input.appendElementToDOM();
    let submitButton = new ElementMakerHTML('div', 'Submit', 'inputDiv', 'js120submitbutton', 'submitbutton');
    submitButton.appendElementToDOM();
  }
}

// gets user input
function getUserInput() {
  if (!validateHoursPerWeekInput('hoursperweek')) return false;
  user = new UserInput();

  let date = new DateMaker(user.avgWeeks * 7);
  user.addYourAvgToDOM(date);

  let maxDate = new DateMaker(user.maxWeeks * 7);
  user.addYourMaxEstimateToDOM(maxDate);
  document.getElementById('submitbutton').style.display = 'none';

  user.addMoreAccurateToDom();
  document.getElementById('js120submitbutton').addEventListener('click', getJS120Input);
}

function getJS120Input() {
  if (!validateHoursPerWeekInput('numberInput')) return false;
  let js120hours = Number(document.getElementById('numberInput').value);
  launchSchoolHours.computeMoreAccurate(js120hours);
}

function validateHoursPerWeekInput(element) {
  let input = Number(document.getElementById(element).value);

  if (Number.isNaN(input) || input <= 0) {
    alert('Please input how many hours you study per week.');
    return false;
  }

  return true;
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

document.getElementById('submitbutton').addEventListener('click', getUserInput);
document.getElementById('submitbutton').addEventListener('click', scrollToBottom);
