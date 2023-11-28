const accountSid = 'ACc7e4cbeaff1af0a6ee8633672785c5f1';
const authToken = 'ecad66abdf5636344184dcc50a771156';
import Twilio from 'twilio';

const client = new Twilio(accountSid, authToken);

async function sendSMS(message) {
  try {
    if (!message) {
      console.error('Message is undefined. Skipping sending SMS.');
      return;
    }

    const response = await client.messages.create({
      body: message,
      from: '+15187540481',
      to: '+16479782595',
    });

    return response.sid;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

export {sendSMS}
