const router=require("express").Router();
const bodyParser = require('body-parser');


let Booking=require("../models/Booking");


router.route("/add").post((req, res) => {
    const { pickupdate, returndate, regnumber,vid, uid, email, contactno, dlicen, aditionalreq,status } = req.body;
  
    const newBooking = new Booking({
      pickupdate,
      returndate,
      regnumber,
      vid,
      uid,
      email,
      contactno,
      dlicen,
      aditionalreq,
      status
    });
  
    newBooking.save()
      .then(() => {
        res.json("Booking added successfully");
        console.log("Booking Added");
      })
      .catch((err) => {
        console.error("Error adding Booking:", err);
        res.status(500).json("Error adding Booking");
      });
  });

// Route to fetch all vehicles
router.route("/").get((req,res)=>{
    // Fetching all vehicles from the database
    Booking.find().then((booking)=>{

        res.json(booking)
    }).catch((err)=>{
        console.log(err); 
    })
});

// Route to update a vehicle by ID
router.route("/update/:id").put((req,res)=>{

    let bookId=req.params.id.trim();

    const { pickupdate, returndate, regnumber, vid,uid,email, contactno, dlicen, aditionalreq,status} = req.body;
    

    const updateBooking={
        pickupdate,
        returndate,
        regnumber,
        vid,
        uid,
        email,
        contactno,
        dlicen,
        aditionalreq,
        status
    }

 Booking.findByIdAndUpdate(bookId, updateBooking, { new: true }) // Add { new: true } to get the updated document
     .then((updateBooking) => {
         if (!updateBooking) {
             return res.status(404).send({ status: "Booking not found" });
         }
         res.status(200).send({ status: "Booking updated", updateBooking });
         console.log("Booking updated");
     })
     .catch((err) => {
         console.log(err);
         res.status(500).send({ status: "Error updating Booking", error: err.message });
     });

});

// Route to delete a vehicle by ID
router.route("/delete/:id").delete(async(req,res)=>{
    let bookId=req.params.id.trim();
    await Booking.findByIdAndDelete(bookId).then(()=>{
        res.status(200).send({status:"Booking deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Booking not deleted"});
    })
});

// Route to get a vehicle by ID
router.route("/get/:id").get(async (req, res) => {
    let bookId = req.params.id.trim(); 
    const vehicle = await Booking.findById(bookId) 
        .then((Vehicle) => {
            res.status(200).send({ status: "booking fetch" ,Vehicle}); 
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "error with find", error: err.message });
        });
});

//get count

router.route("/countBooking").get(async(req,res)=>{
    const count=await Booking.countDocuments().then(()=>{
        res.status(200).send({ status: "get count"}); 
    }).catch((err)=>{
        console.log(err.message);
            res.status(500).send({ status: "error get count", error: err.message });
    })
})

// Modify the backend API route
router.route("/st").get((req, res) => {
    const statusFilter = req.query.status || "pending"; // Default to "Pending" if no status is provided in the query

    // Fetching only pending bookings from the database
    Booking.find({ status: statusFilter })
        .then((booking) => {
            res.json(booking);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/accept").get((req, res) => {
    const statusFilter = req.query.status || "Accept"; // Default to "Pending" if no status is provided in the query

    // Fetching only pending bookings from the database
    Booking.find({ status: statusFilter })
        .then((booking) => {
            res.json(booking);
        })
        .catch((err) => {
            console.log(err);
        });
});

//get a admin by email
router.route("/getUBooking/:id").get(async (req, res) => {
    let uId = req.params.id.trim();

    try {
        const booking = await Booking.find({ uid: uId });
        if (booking) {
            res.status(200).send({ status: "Booking fetch", booking });
        } else {
            res.status(404).send({ status: "Booking not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "error with find", error: err.message });
    }
});

module.exports=router;

