const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 8080; // Set the desired port number

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (optional)
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Configure the email transport
  const transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  // Create the email message
  const mailOptions = {
    from: email,
    to: 'your-email@example.com',
    subject: 'New form submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});