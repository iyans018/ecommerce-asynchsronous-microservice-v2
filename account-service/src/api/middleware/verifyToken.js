import { responseAPI, verifyJWT } from "../../utils"
import statusCodes from "../../utils/status-codes";
import env from "../../config";

export default (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
  
    if (!accessToken) {
      return responseAPI(res, statusCodes.UNAUTHORIZED, null, 'Access token tidak ditemukan');
    }

    const { payload, message } = verifyJWT(accessToken, env.SECRET_KEY);

    if (payload) {
      req.user = payload;
      next();
    } else {
      return responseAPI(res, statusCodes.UNAUTHORIZED, null, message);
    }
  } catch (error) {
    throw new Error('Failed to verify access token');
  }
}