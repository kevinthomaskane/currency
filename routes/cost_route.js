const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const dateFns = require("date-fns");

function convertDateFormatForMoment(date) {
  let newArray = [];
  let dateArray = date.split("/");
  newArray.push(dateArray[2], dateArray[0], dateArray[1]);
  const formattedDate = newArray.join("-");
  return formattedDate;
}

function splitDatesUp(date) {
  let objOfNums = {
    month: "",
    day: "",
    year: ""
  };
  const splitDateArray = date.split("/");
  objOfNums.month = splitDateArray[0] - 1;
  objOfNums.day = splitDateArray[1];
  objOfNums.year = splitDateArray[2];
  return objOfNums;
}

function calculateCost(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].match(/Sunday|Saturday/g) === null) {
      const splitIndex = arr[i].split(" ");
      if (splitIndex[1] < 8) {
        total += 0.05;
      } else if (splitIndex[1] < 15) {
        total += 0.1;
      } else if (splitIndex[1] < 22) {
        total += 0.15;
      } else if (splitIndex[1] < 29) {
        total += 0.2;
      } else {
        total += 0.25;
      }
    }
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return formatter.format(total);
}

function costRoute(app) {
  app.post("/currency", (req, res) => {
    let arrayOfAllDays = [];
    const dateObject = {
      startDate: req.body.startDate,
      numberOfDays: req.body.numberOfDays
    };
    const momentDate = convertDateFormatForMoment(dateObject.startDate);
    const rangeOfDates = moment.rangeFromInterval(
      "day",
      dateObject.numberOfDays,
      moment(momentDate)
    );
    const endDateOfRange = rangeOfDates.end.format("MM/DD/YYYY");
    const formattedEndDate = splitDatesUp(endDateOfRange);
    const formattedStartDate = splitDatesUp(dateObject.startDate);
    const datefns = dateFns.eachDay(
      new Date(
        formattedStartDate.year,
        formattedStartDate.month,
        formattedStartDate.day
      ),
      new Date(
        formattedEndDate.year,
        formattedEndDate.month,
        formattedEndDate.day
      )
    );
    for (let i = 0; i < datefns.length; i++) {
      let newFormat = dateFns.format(datefns[i], "dddd D");
      arrayOfAllDays.push(newFormat);
    }
    const total = calculateCost(arrayOfAllDays);
    res.json(`${total}`);
  });
}

module.exports = costRoute;
