// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";

// import bookRoute from "./route/book.route.js";
// import userRoute from "./route/user.route.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// dotenv.config();

// const PORT = process.env.PORT || 4000;
// const URI = process.env.MongoDBURI;

// // connect to mongoDB
// try {
//     mongoose.connect(URI);
//     console.log("Connected to mongoDB");
// } catch (error) {
//     console.log("Error: ", error);
// }

// // defining routes
// app.use("/book", bookRoute);
// app.use("/user", userRoute);

// //deployment

// if(process.env.NODE_ENV ==="production") {
//     const dirPath = path.resolve();
//     app.use(express.static("Frontend/dist"));
//     app.get("*", (req,res) => {
//         res.sendFile(path.resolve(dirPath,"Frontend","dist","index.html"));
//     })
// }

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Your existing imports and configurations

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
try {
  mongoose.connect(URI);
  console.log("Connected to mongoDB");
} catch (error) {
  console.error("Error connecting to mongoDB: ", error);
}

// Routes
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

app.use("/book", bookRoute);
app.use("/user", userRoute);

// Deployment: Serve Frontend Files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./Frontend/dist/index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
