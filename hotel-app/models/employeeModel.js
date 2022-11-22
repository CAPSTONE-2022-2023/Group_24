const mongoose = require("mongoose");

const employeeSchema = {
    name: String,
    phone: String,
    address: String,
    username: String,
    password: String,
    employeeNum: String
}

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;