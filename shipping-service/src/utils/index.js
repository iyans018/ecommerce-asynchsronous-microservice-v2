import jwt from "jsonwebtoken";
import amqplib from "amqplib";

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

export { verifyJWT, responseAPI, FormateData, createChannel, publishMessage };