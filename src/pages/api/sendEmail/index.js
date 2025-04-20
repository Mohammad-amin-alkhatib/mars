// make this api route send an email using nodemailer as post request

import nodemailer from 'nodemailer';
import cors from 'cors';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phoneNumber, message } = req.body;

        // Validate the input
        if (!name || !email || !phoneNumber || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // accept only requests from same origin
        // const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];
        // const origin = req.headers.origin;
        // if (allowedOrigins.includes(origin)) {
        //     res.setHeader('Access-Control-Allow-Origin', origin);
        // }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mkhatib@marsrobotic.com',       // your Gmail
                pass: 'mghs iqqu stpl ckhf',          // generated app password
            },
        });

        const mailOptions = {
            from: 'mkhatib@marsrobotic.com',
            to: 'diab.sadi98@gmail.com',
            subject: 'Test Email from Node.js',
            text: `
                Name: ${name}
                Email: ${email}
                Phone Number: ${phoneNumber}
                Message: ${message}
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error sending email' });
            }
            res.status(200).json({ message: 'Email sent successfully' });
        });
    }

    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}