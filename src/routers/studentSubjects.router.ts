import { Router } from "express";
import {
  studSubLink,
  studOfSub,
  subOfStud,
} from "../controllers/studentSubjects.controller";

const router = Router();

router.post("/st-sub/create", studSubLink);
router.get("/st-sub/", studOfSub);
router.get("/sub-st/", subOfStud);

export default router;
