// Set required libraries for this script to function correctly.
const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
// Require Winston library to create appropraite logging
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
// Arithmetic functions
const add = (n1, n2) => {
  return n1 + n2;
}
const subtract = (n1, n2) => {
  return n1 - n2;
}
const multiply = (n1, n2) => {
  return n1 * n2;
}
const divide = (n1, n2) => {
  if (n2 === 0) {
    throw new Error("Division by zero");
  }
  return n1 / n2;
}
// REST function endpoints for each arithmetic option. Add, Subtract, Multiply, Divide.
app.get("/add", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    // If a non numerical value is input. An error will output to the user.
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Incorrectly defined input. Enter numerical values only!");
    }
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
    const addResult = add(n1, n2);
    res.status(200).json({ statusCode: 200, data: addResult }); // Print results to user.
  } catch (error) {
    logger.error(error.toString()); // Logs the error captured in the 'throw' method as a string.
    res.status(400).json({ statusCode: 400, msg: error.toString() }); // Outputs error to user.
  }
});

app.get("/subtract", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Incorrectly defined input. Enter numerical values only!");
    }
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');
    const subResult = subtract(n1, n2);
    res.status(200).json({ statusCode: 200, data: subResult });
  } catch (error) {
    logger.error(error.toString());
    res.status(400).json({ statusCode: 400, msg: error.toString() });
  }
});

app.get("/multiply", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Incorrectly defined input. Enter numerical values only!");
    }
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiplication');
    const mulResult = multiply(n1, n2);
    res.status(200).json({ statusCode: 200, data: mulResult });
  } catch (error) {
    logger.error(error.toString());
    res.status(400).json({ statusCode: 400, msg: error.toString() });
  }
});

app.get("/divide", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Incorrectly defined input. Enter numerical values only!");
    }
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');
    const divResult = divide(n1, n2);
    res.status(200).json({ statusCode: 200, data: divResult });
  } catch (error) {
    logger.error(error.toString());
    res.status(400).json({ statusCode: 400, msg: error.toString() });
  }
});
// Use Express library to set port and listen on 3040.
const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})

