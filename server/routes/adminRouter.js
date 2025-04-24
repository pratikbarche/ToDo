import express from 'express';
import { registerController, loginController,settingNameController,uploadController,deleteController,getTodoController } from '../controllers/adminController.js';
import authMiddlware from '../middilware/authMiddilware.js'



//router object
const adminRouter = express.Router();


//register route ||POST method
adminRouter.post('/register', registerController);

//login route || post method
adminRouter.post('/login', loginController);

//setting name || get method
adminRouter.get('/namesetting', authMiddlware, settingNameController);

//upload todo || post method
adminRouter.post('/upload', authMiddlware, uploadController);

//get todo || get method
adminRouter.get('/gettodo', authMiddlware, getTodoController);

//delete todo || delete method
adminRouter.delete('/delete',authMiddlware, deleteController);

export default adminRouter;