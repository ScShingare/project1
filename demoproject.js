let express=require("express");
let app =express();
let db=require("./db");
let bodyParser=require("body-parser");


let path=require("path");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("public"));
//nav page
app.get("/",(req,res)=>{
res.render("nav.ejs");
});
//addemp page
app.get("/addemp",(req,res)=>{
    res.render("addemp.ejs",{msg:""});
    });
//vieemp page
app.get("/viewemp",(req,res)=>{
    db.query("select* from emp",(err,result)=>{
    if(err)
    {
        res.render("viewemp.ejs");
    }
    else{
        res.render("viewemp.ejs",{data:result});
    }
})
    
    });
//to access emp data
 app.post("/save",(req,res)=>{
    let {name,email,contact}=req.body;
    db.query("insert into emp values('0',?,?,?)",[name,email,contact],(err,result)=>{

    });

    res.render("addemp.ejs",{msg:"Employee added successfully"});
 });

 app.get("/deleteempbyid",(req,res)=>{
    let empid=parseInt(req.query.eid.trim());
    db.query("delete from emp where empid=?",[empid],(err,result)=>{
        if (err) {
            return res.status(500).send("Error deleting record");
        }
    
    })

    db.query("select* from emp",(err,result)=>{
        if(err)
        {
            res.render("viewemp.ejs");
        }
        else{
            res.render("viewemp.ejs",{data:result});
        }
    })
   

 })
 app.get("/search",(req,res)=>{
   let sname=req.query.sd;
   db.query("select* from emp where name like '%"+sname+"%' ",(err,result)=>{
    res.json(result);
   });
 });

app.listen(4000,()=>{
console.log("server stated");
});
