import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import amqplib from 'amqplib';

import env from "../config";

const generateSalt = async() => {
  return await bcrypt.genSalt();
}

const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
}

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
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
  return token.expiryDate.getTime() > new Date().getTime();
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

/* Message Broker */
// create a channel
const createChannel = async () => {
  try {
    const connection = await amqplib.connect(env.MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(env.EXCHANGE_NAME, 'direct', false);
    return channel;
  } catch (error) {
    throw error;
  }
}

// publish message
const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(env.EXCHANGE_NAME, binding_key, Buffer.from(message));
    console.log('message sent', message);
  } catch (error) {
    throw error;
  }
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
  createChannel,
  publishMessage
};