const express=require("express");
const app=express();
const routes=require("./routers/index")
const port=3000;
const cookieParser=require("cookie-parser");
const expressLayouts=require("express-ejs-layouts");
const db=require("./config/mongoose");

//to convert form data in json
app.use(express.urlencoded());
// using cookie parsder
app.use(cookieParser());

//setting path for assets 
app.use(express.static("./assets"));


//express layouts
app.use(expressLayouts);
//set static files for layouts and pages
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// express routes
app.use('/', routes);

//setting view engine as ejs 
app.set("view engine","ejs");
app.set("views","./views");


app.listen(port, (err) =>{
    if (err){
        console.log(`theres is an error running server at ${port}: ${err}`)
    }
    console.log(`hurray!! your server is running at port: ${port}`)
});