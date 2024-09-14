import nodemailer from 'nodemailer';
import { signUpEmail } from './verification';

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASSWORD;


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
});
export const sendVerificationEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  try {
    const status = await transporter.sendMail({
      to: email,
      subject: 'Email Verification',
      html: signUpEmail({ email, verificationLink: token }),
    });
    console.log('Email sent:', status);
    return status;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
export default transporter;
