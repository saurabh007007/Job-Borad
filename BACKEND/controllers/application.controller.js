import Application from "../models/application.model.js";
const { Job } = require("../models/job.model");
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job id is required", success: false });
    }
    // user already applied for thsi job or not chceking
    const existingApplication = await Application.findOne({
      jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You already applied for this job", success: false });
    }
    const job = await job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    // creating anew application now
    const newAppliaction = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.application.push(newAppliaction._id);
  } catch (error) {
    console.log(error);
  }
};
