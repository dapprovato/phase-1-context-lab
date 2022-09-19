function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map(function (record) {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(dateStamp) {
    let dateAndTime = {
        type: "TimeIn",
        hour: parseInt(dateStamp.substring(11)),
        date: dateStamp.substring(0, 10)
    }
    let updatedTimeIn = [dateAndTime, ...this.timeInEvents]
    this.timeInEvents = updatedTimeIn
    return this
}


function createTimeOutEvent(dateStamp) {
    let dateAndTime = {
        type: "TimeOut",
        hour: parseInt(dateStamp.substring(11)),
        date: dateStamp.substring(0, 10)
    }
    let updatedTimeOut = [dateAndTime, ...this.timeOutEvents]
    this.timeOutEvents = updatedTimeOut
    return this
}

function hoursWorkedOnDate(dateWorked) {
    let timeIn = this.timeInEvents.find(function (timeInEvent) {
        return timeInEvent.date === dateWorked
    })
    let timeOut = this.timeOutEvents.find(function (timeOutEvent) {
        return timeOutEvent.date === dateWorked
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(dateWorked) {
    let payOwed = this.payPerHour
    return payOwed * hoursWorkedOnDate.call(this, dateWorked)
}

function findEmployeeByFirstName(srcArray, firstName) {
    let employeeName = srcArray.find(function (employee) {
        return (firstName === employee.firstName)
    })
    return employeeName
}

function calculatePayroll(employeeRecords) {
    const payroll = employeeRecords.reduce(function (memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
    return payroll
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}