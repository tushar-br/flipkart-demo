const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/', async (req, res) => {

    const { name, phone, comment, email } = req.body;
    console.log(email, "email");

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "Your Email Id",
                pass: "App Password",
            },
        });

        const mailOption = {
            from: "Your Email Id", // Must be the same as authenticated user
            to: "Your Email Id", // Recipient
            subject: "New Contact Message",
            text: `${comment} | Phone: ${phone} | Name: ${name}`,
            replyTo: email // Allows you to reply directly to the user's email
        }

        await transporter.sendMail(mailOption)
        const contact = new Contact({ name, phone, comment });
        await contact.save();
        res.status(200).json({ message: "Email is sent" })
    }
    catch (err) {
        res.status(500).json({ message: "Email failed to send" })
    }
})


module.exports = router;