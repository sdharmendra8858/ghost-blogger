const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routers/user.router');
const blogRouter = require('./routers/blog.router');

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));

app.use(express.json())
app.use(userRouter);
app.use(blogRouter);

app.listen(port, () => {
    console.log('Server running on port '+ port);
    
})