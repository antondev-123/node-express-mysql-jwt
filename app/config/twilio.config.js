require('dotenv').config(); // Ensure to load environment variables

module.exports = {
  accountSid: process.env.TWILIO_ACCOUNT_SID, // Your Twilio Account SID
  authToken: process.env.TWILIO_AUTH_TOKEN,   // Your Twilio Auth Token
  fromNumber: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
};
