import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'alok.yadav6000@gmail.com',
        to: email,
        subject: subject,
        html:`<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const addTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id;
    try {
        const user = await userModel.findOne({_id: userId});
        const newTask = new taskModel({
            title,
            description,
            completed: false,
            userId,
            dueDate: dueDate ? new Date(dueDate) : null,
            priority: priority || "Medium"
        });
        const savedTask = await newTask.save();
        if (user?.email) {
            sendMail(user.email, "Task Added", title, description)
        }
        return res.status(200).json({ message: "Task added successfully", task: savedTask })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateTask = async (req, res) => {
    const { id, title, description, completed, dueDate, priority } = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(id, {
            title,
            description,
            completed,
            dueDate: dueDate ? new Date(dueDate) : null,
            priority
        }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const removeTask = (req, res) => {
    const { id } = req.query;
    console.log("id: ", id);
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}

const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .sort({ completed: 1, dueDate: 1, createdAt: -1 })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}
export { addTask, updateTask, getTask, removeTask }
