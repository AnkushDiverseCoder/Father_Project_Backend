import express from "express"
import { createEmployeeEnrollment} from "../controllers/EmployeeEnrollmentController.js"

const router = express.Router()

//  create routes
router.post("/", createEmployeeEnrollment)


export default router