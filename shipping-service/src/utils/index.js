import jwt from "jsonwebtoken";

import env from "../config";

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY);
    return { payload: decoded, message: 'berhasil terverifikasi' };
  } catch (error) {
    return { payload: null, message: error.message };
  }
}

const responseAPI = (res, status, data, message) => {
  if (status === 200 || status === 201) {
    return res.status(status).json({ success: true, data, message });
  }

  return res.status(status).json({ success: false, data, message });
}

const FormateData = (status, data, message) => {
  return { status, data, message }
}

export { verifyJWT, responseAPI, FormateData };