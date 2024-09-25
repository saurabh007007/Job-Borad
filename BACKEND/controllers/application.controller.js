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
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    // creating anew application now
    const newAppliaction = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.application.push(newAppliaction._id);
    await job.save();
    return res.status(201).json({
      message: "Applied successfully for this job",
      success: true,
      application: newAppliaction,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplliedJoba = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "job", Options: { sort: { createdAt: -1 } } })
      .populate({ path: "company", Options: { sort: { createdAt: -1 } } });
    if (!applications) {
      return res.status(404).json({
        message: "No applications found for this jobs",
        success: false,
      });
    }
    return res.status(200).json({ applications, success: true });
  } catch (error) {
    console.log(error);
  }
};

//for admin see how much user has applied for the job

export const getApplicant = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 }, populate: { path: "applicant" } },
    });

    if (!job) {
      return res.status(404).json({ message: "No job found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
