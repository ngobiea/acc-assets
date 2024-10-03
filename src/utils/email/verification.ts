export const signUpEmail = ({
  code,
  date,
  name,
}: {
  name: string;
  code: string;
  date: string;
}) => {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 20px; text-align: center;">
                <img src="https://accsl-declaration.s3.eu-north-1.amazonaws.com/accsl2.jpeg" alt="ACC Logo" style="max-width: 150px; height: auto;">
            </td>
        </tr>
        <tr>
            <td style="padding: 0 20px;">
                <p style="color: #888888; font-size: 14px;">${date}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="margin: 0; color: #333333;">Hello ${name},</h2>
                <p style="margin-top: 20px; color: #555555;">Your verification code is:</p>
                <p style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; text-align: center; margin: 30px 0;">${code}</p>
                <p style="color: #555555;">Please note:</p>
                <ul style="color: #555555;">
                    <li>This code is valid for 1 hour only.</li>
                    <li>Keep this code confidential and do not share it with anyone.</li>
                    <li>This is an auto-generated email. Please do not reply.</li>
                </ul>
                <p style="color: #555555;">If you didn't request this code, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                <p style="margin: 0; color: #888888; font-size: 14px;">&copy; 2024 ACC SL. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};
