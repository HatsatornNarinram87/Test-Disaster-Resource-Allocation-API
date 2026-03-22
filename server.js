import express from 'express';
const app = express();
const port = process.env.PORT || 3000;


import indexRouter from './routers/index_router.js';
import errorHandler from './middlewares/error_hander.js';
import bodyParser from 'body-parser';
import { RedisModel } from './models/redis_model.js';

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("OK");
});
app.use('/api', indexRouter);

app.use(errorHandler);
app.listen(port, "0.0.0.0", function () {
  console.log(`Server running on port ${port}`);
});