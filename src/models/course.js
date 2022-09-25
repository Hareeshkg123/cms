/**
 * Schema for course
 */
 const { Schema, model } = require("mongoose");

 const courseSchema = new Schema({
    title:  {
        type: String
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    },
    topicArray: {
        type: String
    },
    duration: {
        type: String
    },
    category: {
        type: String
    }
 });
 
 module.exports = model('Course', courseSchema);