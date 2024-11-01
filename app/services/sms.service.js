// app/services/sms.service.js

const twilio = require('twilio');
const config = require('../config/twilio.config.js'); // Create this file for your Twilio credentials

const client = twilio(config.accountSid, config.authToken);

const sendSMS = (to, body) => {
  return client.messages.create({
    body,
    from: config.fromNumber, // Your Twilio phone number
    to,
  });
};

module.exports = {
  sendSMS,
};
