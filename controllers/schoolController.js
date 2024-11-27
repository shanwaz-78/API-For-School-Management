import { validateSchoolData } from "../validator/validateSchoolData.js";
import services from "../services/index.js";

const addSchoolController = (req, res, next) => {
  const { isValid, message } = validateSchoolData(req.body);
  if (!isValid) {
    return res.status(400).json({ message });
  }
  services.schoolServices.addSchoolService(req.body, res, next);
};

const listSchoolController = (req, res, next) => {
  services.schoolServices.listSchoolService(req, res, next);
};

export default { addSchoolController, listSchoolController };
