var express= require("express");

var app=express();
var path=require("path");
var port=10000;


//ruta estatica(ejecuta todo lo de dentro de public de la forma:/archivo.extension)
app.use("/",express.static(path.join(__dirname + "/public")));


//ruta dinamica
app.get("/home",(req,res)=>{
    res.send("<html><body><h1>HOLA</h1></body></html>");

});

//callback
app.listen(port,()=>{
    //al colocarse de esta forma se  ejecuta el mensaje cuando el servidor este listo
    console.log(`server ready to listen on port ${port}`);
});

