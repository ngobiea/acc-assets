export const declarationEmail =  ({applicationId,name,submissionDate }: {
    name: string;
    applicationId: string;
    submissionDate: string;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asset Declaration Submission Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #4CAF50; border-radius: 8px 8px 0 0;">
                <img src="https://accsl-declaration.s3.eu-north-1.amazonaws.com/accsl2.jpeg" alt="ACC Logo" style="max-width: 150px; height: auto;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #4CAF50; margin-bottom: 20px;">Application Submitted Successfully</h2>
                <p style="color: #333333;">Dear ${name},</p>
                <p style="color: #333333;">We are pleased to inform you that your Assets Declaration application has been successfully submitted. Thank you for complying with the assets declaration process.</p>
                <table cellpadding="0" cellspacing="0" style="margin: 20px 0; border-collapse: collapse; width: 100%;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;">Application ID:</td>
                        <td style="padding: 10px; border: 1px solid #dddddd;">${applicationId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;">Submission Date:</td>
                        <td style="padding: 10px; border: 1px solid #dddddd;">${submissionDate}</td>
                    </tr>
                </table>
                <p style="color: #333333;">Please keep this email for your records. You may be required to provide the Application ID for any future correspondence regarding your assets declaration.</p>
    
                <p style="color: #333333;">If you have any questions or concerns, please don't hesitate to contact our support team at <a href="mailto:support@assetsdeclaration.gov" style="color: #4CAF50;">support@assetsdeclaration.gov</a>.</p>
                <p style="color: #333333;">Thank you for your cooperation in this important process.</p>
                <p style="color: #333333;">Best regards,<br>The ACC SL Assets Declaration Team</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                <p style="margin: 0; color: #888888; font-size: 14px;">&copy; 2024 ACC SL. All rights reserved.</p>
                <p style="margin: 10px 0 0; color: #888888; font-size: 12px;">This is an automated email. Please do not reply.</p>
            </td>
        </tr>
    </table>
</body>
</html>`;
};
