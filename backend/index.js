import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/application.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;



app.use("/user", userRoute);
app.use("/company", companyRoute);
app.use("/job", jobRoute);
app.use("/application", applicationRoute);



app.listen(PORT, async () => {
    try {
        connectDB();
        console.log(`Server running at port ${PORT}`);
    } catch (error) {
        console.log(error)

    }
})