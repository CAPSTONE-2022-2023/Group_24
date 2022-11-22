const mongoose = require("mongoose");

const employeesSchema = {
    name: String,
    phone: String,
    address: String,
    username: String,
    password: String,
    employeeNum: String
}

const Employee = mongoose.model("Employee", employeesSchema);

module.exports = Employee;