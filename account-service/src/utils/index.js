import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import env from "../config";

const generateSalt = async() => {
  return await bcrypt.genSalt();
}

const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

const responseAPI = (res, status, data, message) => {
  if (status === 200 || status === 201) {
    return res.status(status).json({ success: true, data, message });
  }

  return res.status(status).json({ success: false, data, message });
}

const signJWT = (payload) => {
  return jwt.sign(payload, env.SECRET_KEY, { expiresIn: env.JWT_ACCESS_EXPIRATION });
}

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY);
    return { payload: decoded, message: 'berhasil terverifikasi' };
  } catch (error) {
    return { payload: null, message: error.message };
  }
}

const verifyRefreshToken = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      service: env.EMAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      }
    });

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent');
    console.log(error);
  }
}

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
}

const FormateData = (status, data, message) => {
  return { status, data, message }
}

export { 
  generateSalt, 
  hashPassword, 
  comparePassword, 
  responseAPI, 
  signJWT, 
  verifyJWT, 
  verifyRefreshToken, 
  sendEmail, 
  generateRandomString, 
  FormateData,
};