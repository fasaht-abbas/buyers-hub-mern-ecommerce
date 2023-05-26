import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
//Hashing function
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log({
      messege: "error in password hash",
      error,
    });
  }
};

//Matching Password

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
