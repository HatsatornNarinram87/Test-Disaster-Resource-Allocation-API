import { createClient } from "redis";
import dotenv from "dotenv";

const env = process.env.NODE_ENV.trim() || "development".trim();
console.log("ENV:", env);
dotenv.config({
  path: `.env.${env}`
});

// console.log("ENV:", env);
// console.log("REDIS_HOST:", process.env.REDIS_HOST);
// console.log("REDIS_PASSWORD:", process.env.REDIS_PASSWORD);
// console.log("REDIS_PORT:", process.env.REDIS_PORT);
const redisClient = createClient({
  url: process.env.REDIS_URL,
});



export { redisClient };