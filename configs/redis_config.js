import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});



export { redisClient };