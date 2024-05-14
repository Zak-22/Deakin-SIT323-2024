// Create constant variable to holding the 'express' app name
const express= require("express");
    const res = require("express/lib/response"); // Sets the response required library to be used.
    const app= express();
    
    // Add 2 sets of numbers to the get request. This is used in the URL after the ? indicator.
    const addTwoNumber= (n1,n2) => {
        return n1+n2;
    }
    app.get("/addTwoNumber", (req,res)=>{
        const n1= parseInt(req.query.n1); // parse the reqest to Int data type
        const n2=parseInt(req.query.n2);
        const result = addTwoNumber(n1,n2); // Add the 2 sets of numbers to URL string
        res.json({statuscocde:200, data: result }); 
    });
    console.log (addTwoNumber(19,12)); // Sets the exact number to pass through as the parameters for 'n1' and 'n2'.
    const port=3040;
    app.listen(port,()=> {
        console.log("hello i'm listening to port "+port);
    })