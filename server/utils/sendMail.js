import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const verificationLink = `${process.env.BASE_URL}/api/user/verify?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify/ logginwith ( or to change password ) your email: ${verificationLink}`
    };

    await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;