/* Your Code Here */

function createEmployeeRecord(infoArr) {
  let ctr = 0;
  return {
  firstName: infoArr[ctr++],
  familyName: infoArr[ctr++],
  title: infoArr[ctr++],
  payPerHour: infoArr[ctr++],
  timeInEvents: [],
  timeOutEvents: [],
  }
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeEvent(dateStamp, eventType) {
  dateStamp = dateStamp.split(' ')
  const date = dateStamp[0]
  const hour = parseInt(dateStamp[1])
  
  const eventsAccess = eventType === 'TimeIn' ? 'timeInEvents' : 'timeOutEvents';
  return this[eventsAccess].push(
    {
      type: eventType,
      hour: hour,
      date: date,
    })
}

function createTimeInEvent(dateStamp) {
  return createTimeEvent(dateStamp, 'TimeIn')
}

function createTimeOutEvent(dateStamp) {
  return createTimeEvent(dateStamp, 'TimeOut')
}

function hoursWorkedOnDate(employee, date) {
  return 0.100 * 
    (employee.timeOutEvents.find(event => event.date === date).hour
      - employee.timeInEvents.find(event => event.date === date).hour)
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  const workDates = employee.timeInEvents.map(event => event.date)
  return workDates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}