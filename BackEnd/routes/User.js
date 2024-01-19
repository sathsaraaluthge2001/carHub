const router =require("express").Router();
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');

let User=require("../models/User");

//set up multer for file upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') // Choose the directory where you want to store the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname)) // Use the original file name for storing
    }
});

const upload = multer({ storage: storage });

//Route to add a new admin
router.route("/add").post(upload.single('image'),(req,res)=>{
    
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
      }
    
    // Retrieving vehicle details from request body
    const image=req.file.filename;
    const {email,name,password,address,nic,contactno,gender}= req.body;

    //create new Admin instance with recieved data
    const newUser=new User({
        image,
        email,
        name,
        password,
        address,
        nic,
        contactno,
        gender
    })

    //saving the new Admin to the database

    newUser.save().then(()=>{
        res.status(200).json("User add successfully");
        console.log("User add");
    }).catch((err)=>{
        console.error("Error adding User:", err);
        res.status(500).json("Error adding User");
    });

});

//fetch all Admin
router.route("/").get((req,res)=>{
    User.find().then((user)=>{
        res.json(user);
    }).catch((err)=>{
        console.log(err);
    })
});

//update Admin
router.route("/update/:id").put((req,res)=>{
    let UserId=req.params.id.trim();

    const {
        email,
        name,
        password,
        address,
        nic,
        contactno,
        gender
    }=req.body;

    const updateUser={
        email,
        name,
        password,
        address,
        nic,
        contactno,
        gender
    };

    Admin.findByIdAndUpdate(UserId,updateUser,{new:true})
        .then((updateUser)=>{
            if(!updateUser){
                return res.status(404).send({status:"User not found"});
            }

            res.status(200).send({start:"User updated",updateAdmin});
            console.log("User update");
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"User not updated,",error:err.message});
        });

});

//get a admin by email
router.route("/get/:id").get(async (req, res) => {
    let email = req.params.id.trim();

    try {
        const user = await User.find({ email: email });
        if (user) {
            res.status(200).send({ status: "user fetch", user });
        } else {
            res.status(404).send({ status: "user not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "error with find", error: err.message });
    }
});

//get a admin by id
router.route("/getid/:id").get(async (req, res) => {
    let userId = req.params.id.trim();

    try {
        const user = await User.findById(userId);

        if (user) {
            res.status(200).send({ status: "user fetch", user });
        } else {
            res.status(404).send({ status: "user not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "error with find", error: err.message });
    }
});




router.route("/delete/:id").delete(async(req,res)=>{
    let userId=req.params.id.trim();

    await User.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"User not deleted"});
    });

});

router.route("/countAdmin").get(async(req,res)=>{
    const count=await User.countDocument().then(()=>{
        res.status(200).send({ status: "get count"}); 
    }).catch((err)=>{
        console.log(err.message);
            res.status(500).send({ status: "error get count", error: err.message });
    })
});

module.exports=router;
