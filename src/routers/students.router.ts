import { Router } from "express";
import {
  createStudent,
  findAllStudents,
  findOneStudent,
  updateById,
  deleteById,
} from "../controllers/students.controller";

const router = Router();

// routes
router.post("/student/create", createStudent);
router.get("/students", findAllStudents);
router.get("/student/:id", findOneStudent);
router.patch("/student/update/:id", updateById);
router.delete("/student/delete/:id", deleteById);

export default router;
