// Registeration controller
import Jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";

// nodemailer transporter

export const registerController = async (req, res) => {
  try {
    const { email, name, phone, password, address } = req.body;

    if (!name) {
      res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!phone) {
      res.status(400).send({
        success: false,
        message: "Phone Number is required",
      });
    }
    if (!address) {
      res.status(400).send({
        success: false,
        message: "address is required",
      });
    }
    if (!password) {
      res.status(400).send({
        success: false,
        message: "password is required",
      });
    }

    // user verfication
    const exsistingUser = await userModel.findOne({ email });
    if (exsistingUser) {
      res.status(200).send({
        success: false,
        message: "This User ia already registered please login",
      });
    }

    //regitering the new user and hashing the password
    const hashedPassword = await hashPassword(password);

    //register user

    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    return res.status(200).send({
      success: true,
      message: "user registered sucessfuly",
      user,
    });
  } catch (error) {
    console.log({
      success: false,
      message: "error in the registration",
      error,
    });
  }
};

//LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return {
        success: false,
        message: "Email OR Password is Missing",
      };
    }
    //verification of the user
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        msessage: "the user is not registered please Resgister first",
      });
    }

    // velidating the user by matching the password
    const match = comparePassword(password, user.password);
    if (!match) {
      res.status(401).send({
        success: false,
        message: "the password is not valid",
      });
    }
    //creatinng a token

    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Logged in Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "error Login",
    };
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user with matching email
    console.log(email);
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Generate random token for password reset
    const resetToken = Math.random().toString(36).slice(-8);

    // Update user's resetToken field in database
    user.resetToken = resetToken;
    await user.save();

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Define email message
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password reset request",
      text:
        `Hi ${user.name},\n\n` +
        `We have received a request to reset your password.` +
        `Please use the following token to reset your password: ${resetToken}\n\n` +
        `If you did not make this request, please ignore this email.\n\n` +
        `Best regards,\n` +
        `Buyers Hub Team`,
    };

    // Send email message
    await transporter.sendMail(mailOptions);

    // Return success message
    res.send({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// Handle POST request to update user's password
export const updatePassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const newHashedPassword = await hashPassword(newPassword);
  try {
    // Find user with matching email and token
    const user = await userModel.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).send({ message: "Invalid token" });
    }
    await userModel.findByIdAndUpdate(
      user._id,
      { password: newHashedPassword },
      { new: true }
    );
    user.resetToken = "";

    // Return success message
    res.send({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

///Update profile Controller

export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;

    const user = await userModel.findOne({ email });
    // velidating the user by matching the password
    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "the password is not valid",
      });
    }

    const updated = await userModel.findByIdAndUpdate(
      req.user._id,
      { name: name, phone: phone, address: address },
      { new: true }
    );

    console.log(updated);
    res.status(200).send({
      success: true,
      message: "The User Profile Has Been updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////// UPdating the admin
export const updateAdminController = async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;

    const user = await userModel.findOne({ email });
    // velidating the user by matching the password
    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "the password is not valid",
      });
    }

    const updated = await userModel.findByIdAndUpdate(
      req.user._id,
      { name: name, phone: phone, address: address },
      { new: true }
    );

    console.log(updated);
    res.status(200).send({
      success: true,
      message: "The User Profile Has Been updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error);
  }
};

// for getting all the registered users
export const getUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {}
};

export const contactController = async (req, res) => {
  try {
    const { email, message, subject, name } = req.body;

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    // Define email message
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `${subject}`,
      text:
        `Here is a message from ${name} \n\n` +
        `MESSAGE:${message}\n\n` +
        `` +
        `contact back on ${email}\n\n` +
        `` +
        `Buyers Hub Contact Form\n\n`,
    };

    // Send email message
    await transporter.sendMail(mailOptions);

    res.send({ success: true, message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
  }
};
