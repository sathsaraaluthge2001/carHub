const router =require("express").Router();
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');

let Admin=require("../models/Admin");
const { start } = require("repl");
const { error } = require("console");

//set up multer for file upload

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.orginalname))
    }
});

const upload=multer({storage:storage});

//Route to add a new admin
router.route("/add").post(upload.single('image'),(req,res)=>{
    
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
      }
    
    // Retrieving vehicle details from request body
    const image=req.file.filename;
    const {email,name,password,role}= req.body;

    //create new Admin instance with recieved data
    const newAdmin=new Admin({
        image,
        email,
        name,
        password,
        role
    })

    //saving the new Admin to the database

    newAdmin.save().then(()=>{
        res.status(200).json("Admin add successfully");
        console.log("Admin add");
    }).catch((err)=>{
        console.error("Error adding Admin:", err);
        res.status(500).json("Error adding vehicle");
    });

});

//fetch all Admin
router.route("/").get((req,res)=>{
    Admin.find().then((admin)=>{
        res.json(admin);
    }).catch((err)=>{
        console.log(err);
    })
});

//update Admin
router.route("/update/:id").put((req,res)=>{
    let AdminId=req.params.id.trim();

    const {
        email,
        name,
        password,
        role
    }=req.body;

    const updateAdmin={
        email,
        name,
        password,
        role
    };

    Admin.findByIdAndUpdate(AdminId,updateAdmin,{new:true})
        .then((updateAdmin)=>{
            if(!updateAdmin){
                return res.status(404).send({status:"Admin not found"});
            }

            res.status(200).send({start:"Admin updated",updateAdmin});
            console.log("Admin update");
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"admin not updated,",error:err.message});
        });

});

//get a admin by email
router.route("/get/:id").get(async (req, res) => {
    let email = req.params.id.trim();

    try {
        const admin = await Admin.find({ email: email });
        if (admin) {
            res.status(200).send({ status: "Admin fetch", admin });
        } else {
            res.status(404).send({ status: "Admin not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "error with find", error: err.message });
    }
});



router.route("/delete/:id").delete(async(req,res)=>{
    let adminId=req.params.id.trim();

    await Admin.findByIdAndDelete(adminId).then(()=>{
        res.status(200).send({status:"Admin deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Admin not deleted"});
    });

});

router.route("/countAdmin").get(async(req,res)=>{
    const count=await Admin.countDocument().then(()=>{
        res.status(200).send({ status: "get count"}); 
    }).catch((err)=>{
        console.log(err.message);
            res.status(500).send({ status: "error get count", error: err.message });
    })
});

module.exports=router;
