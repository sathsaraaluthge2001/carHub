const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const app=express();

// Load environment variables from .env file
require("dotenv").config();

const PORT=process.env.PORT || 6060 // Define the port to listen on

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming request bodies as JSON
app.use(express.static('public'));

const URL=process.env.MONGODB_URL; // Retrieve MongoDB URL from environment variables

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongoose Connection Successful");
});

const vehicleRouter=require("./routes/Vehicle.js"); // Import the vehicle router
app.use("/Vehicle",vehicleRouter); // Use the vehicle router for '/Vehicle' routes

const adminRouter=require("./routes/Admin.js"); // Import the vehicle router
app.use("/Admin",adminRouter);// Use the vehicle router for '/Vehicle' routes

const userRouter=require("./routes/User.js"); // Import the vehicle router
app.use("/User",userRouter);// Use the vehicle router for '/Vehicle' routes

const bookingRouter=require("./routes/Booking.js"); // Import the vehicle router
app.use("/Booking",bookingRouter);// Use the vehicle router for '/Vehicle' routes

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`); // Log server start with the selected port
  });
  