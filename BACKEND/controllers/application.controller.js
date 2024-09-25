import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
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

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for admin see how much user has applied for the job

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
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

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
