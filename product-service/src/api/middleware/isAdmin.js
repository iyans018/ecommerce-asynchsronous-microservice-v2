import { responseAPI } from "../../utils";
import statusCodes from "../../utils/status-codes";

export default (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return responseAPI(res, statusCodes.UNAUTHORIZED, null, 'Anda tidak memiliki akses untuk mengakses API ini');
    } else {
      next();
    }
  } catch (error) {
    throw new Error("Failed to verify admin")
  }
}