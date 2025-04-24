import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import todoModel from '../model/todoModel.js';

//Register controller
export const registerController = async(req,res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: "User already exist", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(5);
        const hashedPasswaord = await bcrypt.hash(password, salt);
        req.body.password = hashedPasswaord;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Registration Successfully", success: true });


    }
    catch (error){
        console.log(error);
    }
}

//login controller

export const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user)
        {
            return res.status(200).send({ message: "user not found", success: false });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(200).send({ message: "username and password dosent matched", success: false });
        }
        const token = jwt.sign({ Id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).send({ message: "login successfull", success: true,token});
        
    }
    catch (error) {
        console.log(error);
    }
}

//setting name controller
export const settingNameController = async (req, res) => {
    try {
        const userId = req.user.Id;
        const user = await userModel.findById({_id:userId });
    if (!user)
    {
        return res.status(400).send({ message: "user not found", success: false });
    }
    else {
        res.status(200).send({ success: true, data:user });
    }
    }
    catch (error) {
        console.log(error);
    }
}

//upload todo controller

export const uploadController = async (req, res) => {
    try {
        const userid =req.user.Id;
        const existingUser = await userModel.findById({ _id: userid });
        if (!existingUser) {
            return res.status(200).send({ message: "user not foud,please register first and login", success: false });
        }
        const addtodo = req.body.todo;  // front end me variable ka name todo rakhana he 
        const newTodo = new todoModel({todo:addtodo,userId:userid});
        await newTodo.save();
        res.status(200).send({ message: "new todo added", success: true });
    } catch (error) {
        console.log(error);
    }
}

//get todo controller
export const getTodoController = async (req, res) => {
    try {
        const userid =req.user.Id
        const gettodo = await todoModel.find({ userId: userid });
        if (gettodo.length == 0) {
            return res.status(200).send({ message: 'No todo available', success: false });
        }
         res.status(200).send({ gettodo,success:true});
    } catch (error) {
        console.log(error);
    }
}


//delete todo controller
export const deleteController = async (req, res) => {
    try {
        const todoID =req.body.ID; //front end me value ka name ID rakhna he 
        await todoModel.findByIdAndDelete({ _id: todoID });
        res.status(200).send({ message: "deleted successfully", success: true });
    } catch (error) {
        console.log(error);
    }
}