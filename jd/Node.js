const express = require('express');
const stripe = require('stripe')('your-secret-key-here');  // Replace with your Stripe secret key
const app = express();

app.use(express.json());

app.post('/submit-payment', async (req, res) => {
  const { token } = req.body;

  try {
    // Create a charge using the token
    const charge = await stripe.charges.create({
      amount: 5000,  // Amount in cents
      currency: 'usd',
      description: 'Payment for Product',
      source: token,
    });

    // Send confirmation email (using a service like SendGrid or Mailgun)
    sendPaymentConfirmationEmail(charge);

    res.json({ message: 'Payment successful, confirmation sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed: ' + error.message });
  }
});

// Example function to send a confirmation email
function sendPaymentConfirmationEmail(charge) {
  const sendgrid = require('@sendgrid/mail');
  sendgrid.setApiKey('your-sendgrid-api-key-here');  // Replace with your SendGrid API key

  const msg = {
    to: 'support@yourcompany.com',  // Your company email address
    from: 'no-reply@yourcompany.com',
    subject: 'Payment Confirmation',
    text: `A payment of $${charge.amount / 100} has been made. Transaction ID: ${charge.id}`,
  };

  sendgrid.send(msg).then(() => {
    console.log('Payment confirmation sent!');
  }).catch((error) => {
    console.error('Error sending email:', error);
  });
}

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
