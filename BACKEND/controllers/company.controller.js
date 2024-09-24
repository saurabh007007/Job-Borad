import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists with this name",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // loged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "No company found", success: false });
    }
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
  }
};

//get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "No company found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, decsription, website, location } = req.body;
    const file = req.file;
    //cloudinary upload  wala part aayega n idhar abhi
    const updateData = { name, decsription, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Updated Company Informations",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
