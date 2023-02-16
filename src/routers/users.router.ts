import { Router } from "express";
import {
  testController,
  createRole,
  signup,
  login,
} from "../controllers/users.controller";

const router = Router();

// routes
router.get("/test", testController);
router.post("/roles/create", createRole);
router.post("/users/signup", signup);
router.post("/users/login", login);

export default router;
