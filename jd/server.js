const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here'); // Replace with your Stripe secret key
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Stripe Connect account ID (Owner's Stripe account)
const connectedAccountId = 'GB21REVO00997038620539';  // Replace with the owner's Stripe Connect account ID

// Endpoint to handle the payment
app.post('/submit-payment', async (req, res) => {
    try {
        const { token } = req.body;

        // Create a charge for the customer using the payment token
        const charge = await stripe.paymentIntents.create({
            amount: 49.99,  // Amount in cents (e.g., &pound 49.99)
            currency: 'usd',
            payment_method: token,
            confirm: true,
            transfer_data: {
                destination: connectedAccountId,  // Transfer funds to the owner's account
            },
        });

        // Respond to the client with success
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
