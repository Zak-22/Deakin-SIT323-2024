// Create variable express that holds the package name
var express = require("express")
// Create variable for 'express' package
var app = express()
// Sets the port variable value to 3000 and starts listening on this port and outputs this process.
var port = process.env.port || 3040;
app.listen(port,()=>{
console.log("App listening to: "+port)
})