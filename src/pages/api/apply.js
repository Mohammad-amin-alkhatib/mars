import nodemailer from 'nodemailer'; //For sending emails
import formidable from 'formidable';// For parsing form data
import fs from 'fs';//File system module for reading/deleting files

export const config = {
  api: {
    bodyParser: false, //Disables Next.js's default body parsing so we can handle file uploads manually
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') { //Only POST requests are processed
    res.setHeader('Allow', ['POST']); //only POST method is allowed
    return res.status(405).end(`Method ${req.method} Not Allowed`);//sets HTTP status code to 405 Method Not Allowed
  }

  try {
     //Formidable is a Node.js module for parsing form data, especially file uploads from multipart/form-data forms.
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, //10MB limit,Rejects any file larger than 10MB
      keepExtensions: true,   //Preserves the original file extension in the temporary file
    });

    const [fields, files] = await form.parse(req);
    
    // Extract form fields
    const firstName = fields.firstName?.[0] || '';
    const lastName = fields.lastName?.[0] || '';
    const email = fields.email?.[0] || '';
    const phoneNumber = fields.phoneNumber?.[0] || '';
    const jobTitle = fields.jobTitle?.[0] || 'Not Specified';
    const cvFile = files.cv?.[0];

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !cvFile) {
      return res.status(400).json({ 
        error: 'All fields are required including CV file' 
      });
    }

    // Validate file type
    if (cvFile.mimetype !== 'application/pdf') {
      return res.status(400).json({ 
        error: 'Only PDF files are allowed for CV' 
      });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'mkhatib@marsrobotic.com',
        pass: process.env.EMAIL_PASSWORD || 'mghs iqqu stpl ckhf',
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Jawabreh@marsrobotic.com',
      to: process.env.EMAIL_TO || 'mahmoud.Abedelfattah@marsrobotic.com',
      subject: `Job Application: ${firstName} ${lastName}`,
      text: `
New Job Application Received:

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone Number: ${phoneNumber}

This email contains an attached CV file.
      `,
      html: `
        <h2>New Job Application Received - ${jobTitle}</h2>
        <table border="0" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #ddd; font-weight: bold;">First Name:</td>
            <td style="border: 1px solid #ddd;">${firstName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; font-weight: bold;">Last Name:</td>
            <td style="border: 1px solid #ddd;">${lastName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; font-weight: bold;">Phone Number:</td>
            <td style="border: 1px solid #ddd;">${phoneNumber}</td>
          </tr>
        </table>
        <p><strong>CV has been attached to this email.</strong></p>
      `,
      attachments: [
        {
          filename: `CV_${firstName}_${lastName}.pdf`,
          content: fs.createReadStream(cvFile.filepath),
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Clean up temporary file
    if (cvFile.filepath) {
      fs.unlinkSync(cvFile.filepath);
    }

    console.log('Email sent:', info.messageId);
    
    res.status(200).json({ 
      message: 'Application submitted successfully!',
      emailId: info.messageId 
    });

  } catch (error) {
    console.error('Error processing application:', error);
    
    if (error.code === 'ETLSIZE') {
      return res.status(400).json({ 
        error: 'File size too large. Maximum 10MB allowed.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to submit application. Please try again.' 
    });
  }
}