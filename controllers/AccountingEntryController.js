import { AccountingEntry } from "../models/AccountingEntryModel.js";
import { CustomerHead } from "../models/CustomerHeadModel.js";
import Emailjs from "emailjs-com";

export const AccountingEntryApi = async (req, res, next) => {
  try {
    const {
      customerName,
      monthComplianceDate,
      monthComplianceAmount,
      epfAmount,
      esicAmount,
      otherDebit,
      professionalFees,
      remarks,
      sendEmail
    } = req.body;

    const customerHeadData = await CustomerHead.findOne({ customerName });
    
    await AccountingEntry.create({
      customerName,
      monthComplianceDate,
      monthComplianceAmount,
      epfAmount,
      esicAmount,
      otherDebit,
      remarks,
      email: customerHeadData.email ? customerHeadData.email : "",
      contactNumber: customerHeadData.contactNumber,
      professionalFees,
      representativeName: customerHeadData.representativeName,
    });

    if(sendEmail){
      Emailjs.sendForm('service_pfi3nzc','template_jxrteyn',{
        monthComplianceAmount:monthComplianceAmount,
        totalDebit:epfAmount+esicAmount+otherDebit+professionalFees,
        closingBalance:monthComplianceAmount-(epfAmount+esicAmount+otherDebit+professionalFees),
        emailBackend:"thakurtulja0@gmail.com"
      },'mRXi-zN_LJvQpgcDw').then((res)=>{
        res.status(200).json({
          status: true,
          msg: "Email Send successfully",
          response:res
        })
      })
    }else{
      res.status(200).json({
        status: true,
        msg: "AccountingEntry Created successfully",
      });
    }

  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};


