/**
 * Contains logic for connecting to the underlying DB.
 */
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cms")
  .then((mongoDB: any) => {
    console.log(`Successfully connected to mongodb.`);
    return mongoDB;
  })
  .catch((err: any) => {
    console.log(err);
    throw err;
  });

export default mongoose;
