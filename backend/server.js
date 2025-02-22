const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors()) // Allow requests from frontend

// Email Sending Function
async function sendVerificationEmail(email, verificationCode) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'princeajycuyos@gmail.com', // Your Gmail
      pass: 'cdzs baum sykl hgae', // Your App Password (NOT your Gmail password)
    },
  })

  const mailOptions = {
    from: 'princeajycuyos@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Good Day! Thank you for using the Job Management System. Your verification code is: ${verificationCode}`,
  }

  await transporter.sendMail(mailOptions)
}

// API Endpoint to Send Email
app.post('/send-email', async (req, res) => {
  const { email, code } = req.body

  try {
    await sendVerificationEmail(email, code)
    res.status(200).json({ message: 'Verification email sent successfully!' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})
