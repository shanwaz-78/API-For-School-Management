import { Router } from "express";
import controllers from "../controllers/index.js";

const schoolRouter = Router();

schoolRouter.post(
  "/addSchool",
  controllers.schoolController.addSchoolController
);
schoolRouter.get(
  "/listSchools",
  controllers.schoolController.listSchoolController
);

export default schoolRouter;
