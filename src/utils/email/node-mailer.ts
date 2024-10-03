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
  name,
}: {
  email: string;
  token: string;
  name: string;
}) => {
  try {
    const status = await transporter.sendMail({
      to: email,
      subject: 'Email Verification',
      html: signUpEmail({ code: token, date: new Date().toDateString(), name }),
    });
    console.log('Email sent:', status);
    
    return status.messageId;
  } catch (error) {
    console.error('Error sending email:', error);
     return null
  }
};
export default transporter;
