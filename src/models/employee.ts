/**
 * Schema for employee
 */
 const { Schema, model } = require("mongoose");

 const employeeSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee', 'admin', 'superadmin'],
        default: 'employee'
    }
 });
 
 module.exports = model('Employee', employeeSchema);