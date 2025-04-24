import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRouter from './routes/adminRouter.js';
import connectDB from './database/db.js';
import authMiddilware from './middilware/authMiddilware.js';


//env config
dotenv.config();

//database connect
connectDB();


//rest object
const app = express();

app.use(cors());
app.use(express.json());
//middilwarre


//routes
app.use('/api/v1/admin', adminRouter);


//port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});
