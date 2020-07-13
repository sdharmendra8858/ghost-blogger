const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routers/user.router');
const blogRouter = require('./routers/blog.router');

const app = express();
const port = process.env.PORT;

const whitelist = ['http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
}

app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.json())
app.use(userRouter);
app.use(blogRouter);

app.listen(port, () => {
    console.log('Server running on port '+ port);
    
})