const router=require("express").Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path=require('path');

let Vehicle=require("../models/Vehicle");



// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') // Choose the directory where you want to store the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname)) // Use the original file name for storing
    }
  });

  const upload = multer({ storage: storage });

// Route to add a new vehicle
router.route("/add").post(upload.single('image'),(req,res)=>{

    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
      }
    
    // Retrieving vehicle details from request body
    const image=req.file.filename; // Get the path to the uploaded image
    const { brand, model, year, type, fueltype, features, priceperday,transmission,regnumber,available } = req.body;
    
    // Creating a new Vehicle instance with the received data
    const newVehicle=new Vehicle({
        image,
        brand,
        model,
        year,
        type,
        fueltype,
        features,
        priceperday,
        transmission,
        regnumber,
        available
    })

    // Saving the new vehicle to the database
    newVehicle.save()
    .then(() => {
    res.json("Vehicle added successfully");
    console.log("Vehicle Added");
  })
  .catch((err) => {
    console.error("Error adding vehicle:", err);
    res.status(500).json("Error adding vehicle");
  });

});

// Route to fetch all vehicles
router.route("/").get((req,res)=>{
    // Fetching all vehicles from the database
    Vehicle.find().then((vehicle)=>{

        res.json(vehicle)
    }).catch((err)=>{
        console.log(err); 
    })
});

// Route to update a vehicle by ID
router.route("/update/:id").put(upload.single('image'),(req,res)=>{

    let vehiId=req.params.id.trim();

 const {
     brand,
     model,
     year,
     type,
     fueltype,
     features,
     priceperday,
     transmission,
     regnumber,
     available
 } = req.body;

 const updateVehicle = {
     brand,
     model,
     year,
     type,
     fueltype,
     features,
     priceperday,
     transmission,
     regnumber,
     available
 };

 Vehicle.findByIdAndUpdate(vehiId, updateVehicle, { new: true }) // Add { new: true } to get the updated document
     .then((updatedVehicle) => {
         if (!updatedVehicle) {
             return res.status(404).send({ status: "Vehicle not found" });
         }
         res.status(200).send({ status: "Vehicle updated", updatedVehicle });
         console.log("Vehicle updated");
     })
     .catch((err) => {
         console.log(err);
         res.status(500).send({ status: "Error updating vehicle", error: err.message });
     });

});

// Route to delete a vehicle by ID
router.route("/delete/:id").delete(async(req,res)=>{
    let vehiId=req.params.id.trim();
    await Vehicle.findByIdAndDelete(vehiId).then(()=>{
        res.status(200).send({status:"vehicle deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"vehicle not deleted"});
    })
});

// Route to get a vehicle by ID
router.route("/get/:id").get(async (req, res) => {
    let vehiId = req.params.id.trim(); 
    const vehicle = await Vehicle.findById(vehiId) 
        .then((Vehicle) => {
            res.status(200).send({ status: "vehicle fetch" ,Vehicle}); 
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "error with find", error: err.message });
        });
});

//get count

router.route("/countVehi").get(async(req,res)=>{
    const count=await Vehicle.countDocuments().then(()=>{
        res.status(200).send({ status: "get count"}); 
    }).catch((err)=>{
        console.log(err.message);
            res.status(500).send({ status: "error get count", error: err.message });
    })
})

// Route to update availability of a vehicle by ID
router.route("/updateAvailability/:id").put(async (req, res) => {
    let vehiId = req.params.id.trim();

    const { available } = req.body;

    const updateVehicle = {
        available
    };

    Vehicle.findByIdAndUpdate(vehiId, updateVehicle, { new: true })
        .then((updatedVehicle) => {
            if (!updatedVehicle) {
                return res.status(404).send({ status: "Vehicle not found" });
            }
            res.status(200).send({ status: "Availability updated", updatedVehicle });
            console.log("Vehicle availability updated");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error updating vehicle availability", error: err.message });
        });
});


module.exports=router;

