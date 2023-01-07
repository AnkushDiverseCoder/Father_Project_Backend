import { EmployeeEnrollment } from "../models/EmployeeEnrollmentModel.js";

export const createEmployeeEnrollment = async (req, res, next) => {
  try {
    const {
      customerName,
      joiningDate,
      enrollmentDate,
      EmployeeName,
      fatherName,
      esicIpNumber,
      Uan,
      remarks,
    } = req.body;

    const duplicateFind = await EmployeeEnrollment.findOne({
      customerName,
      joiningDate,
      enrollmentDate,
      EmployeeName,
      fatherName,
      esicIpNumber,
      Uan,
      remarks,
    });

    if (!duplicateFind) {
      await EmployeeEnrollment.create({
        customerName,
        joiningDate,
        enrollmentDate,
        EmployeeName,
        fatherName,
        esicIpNumber,
        Uan,
        remarks,
      });
    } else {
      return res.status(200).json({
        status: false,
        msg: `Duplicate Entry Found In ${EmployeeName}, Verify Before Submit `,
      });
    }

    res.status(200).json({
      status: true,
      msg: "Entry Done Successfully",
    });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};
