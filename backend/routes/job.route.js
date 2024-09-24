import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuthenticated, postJob);
jobRouter.get("/get", isAuthenticated, getAllJobs);
jobRouter.get("/getadminjobs", isAuthenticated, getAdminJobs);
jobRouter.get("/get/:id", isAuthenticated, getJobById);

export default jobRouter;

