import express from 'express';
const app = express();
import cors from 'cors';
import jwt from './helpers/jwt_helper.js';
import errorHandler from './helpers/error-handler.js';
import userRoute from './routes/users/user.routes.js';
import appRoute from './routes/app/app.controller.js';
app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(cors());
app.use(jwt());

app.use('/users', userRoute);
app.use('/app', appRoute);
app.use(errorHandler);

// const port = process.env.NODE_ENV === 'production' ? 80 : 3000;

app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on port ' +(process.env.PORT || 3000));
});


