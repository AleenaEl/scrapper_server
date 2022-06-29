import express from 'express';
const app = express();
import cors from 'cors';
import jwt from './helpers/jwt_helper.js';
import errorHandler from './helpers/error-handler.js';
import userRoute from './routes/users/user.routes.js';
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(jwt());
app.use('/users', userRoute);
app.use(errorHandler);

app.listen(process.env.PORT || 4000, function() {
  console.log('Server listening on port ' +(process.env.PORT || 4000));
});


