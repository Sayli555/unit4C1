const express=require("express");
const app=express();

app.use(logger);

app.get("/books",(req,res)=>{
    return res.send({route:"/books",role:req.role})
})


app.get("/libraries ",checkPermission("librarian"),(req,res)=>{
    return res.send({ route: "/libraries", permission: true,role:req.role})
});


app.get("/authors",checkPermission("author"),(req,res)=>{
    return res.send({ route: "/authors", permission: true,role:req.role})
});



function logger(req,res,next){
    if(req.path="/books"){
        req.role="books";
        console.log("Before next books");
        next();
        console.log("after next books");

    }
    else if(req.path="/libraries"){
        req.role="libraries";
        console.log('befor next:- libraries');
        next();
        console.log('after next:- libraries');

    }
    else if(req.path="/authors"){
        req.role="authors";
        console.log('befor next:- authors');

        next();
        console.log('after next:- authors');
    }        

   
}


function checkPermission(){
    return function permission(req,res,next){
        if(req.path==="/libraries"){
            console.log("libraray Permission :true")
            // req.role="libraries";
        
            next();
        }
        else if(req.path="/authors"){
            // req.role="authors";
            console.log('authors permission ');
            next();
        }
        else{
           
            console.log("wrong rout handler")
        }
    }
}






app.listen(5555,()=>{
    console.log("listening 5555 server")
})