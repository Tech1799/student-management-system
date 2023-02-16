import { Router } from "express";
import {
  createSubject,
  findAllSubjects,
  findOneSubject,
  updateById,
  deleteById,
} from "../controllers/subjects.controller";

const router = Router();

// routes
router.post("/subject/create", createSubject);
router.get("/subjects", findAllSubjects);
router.get("/subject/:id", findOneSubject);
router.patch("/subject/update/:id", updateById);
router.delete("/subject/delete/:id", deleteById);

export default router;
