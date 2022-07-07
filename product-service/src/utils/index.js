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

// subscribe message
const subscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(env.QUEUE_NAME);
  
  channel.bindQueue(appQueue.queue, env.EXCHANGE_NAME, env.PRODUCT_BINDING_KEY);

  channel.consume(appQueue.queue, async data => {
    console.log('received data');
    console.log(data.content.toString());
    service.SubscribeEvents(data.content.toString());
    channel.ack(data);
  });
}

export { verifyJWT, responseAPI, FormateData, createChannel, subscribeMessage };