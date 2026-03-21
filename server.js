import express from 'express';
const app = express();
const port = 3000;

import indexRouter from './routers/index_router.js';
import errorHandler from './middlewares/error_hander.js';

app.use('/api', indexRouter);

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});