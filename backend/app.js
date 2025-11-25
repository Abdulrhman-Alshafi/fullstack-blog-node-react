import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//auth routes
app.use("/api/auth", authRoutes);
//blog routes
app.use("/api/blogs", blogRoutes);
//comment routes
app.use("/api/blogs/:blogId/comments", commentRoutes);
//categories routes
app.use("/api/categories", categoryRoutes);
//tags routes
app.use("/api/tags", tagRoutes);
//user routes
app.use("/api/users", userRoutes);

//handle error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
