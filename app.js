const   express = require("express");
const   bodyParser = require("body-parser");
const   path = require("path");
const   Adminroute = require("./route/adminroute"),
        Vendorroute = require("./route/vendorroute"),
        customerroute = require("./route/cutomerRoute"),
      
        mongoose        =           require("mongoose");
var {db_URL} = require("./config/keys");

mongoose.connect(db_URL, {useUnifiedTopology: true,useNewUrlParser: true}).then(function(result){
    console.log("connected");
}).catch(function(err){
    console.log(err)
})
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/admin", Adminroute);
app.use("/vendor", Vendorroute);
app.use("/user", customerroute);
app.use(require("./route/shoppingroute"));

app.get("/",function(req,res){
    res.send("to resgiter vendor admin/register to login admin/login to view vendors admin/vendors a specific vendor admin/vendor/:id");
})
var port = process.env.PORT || 4000;
if(app.listen(port)){
    console.log("This is Running at port ", port);
}
