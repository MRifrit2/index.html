<?php
// If the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $card_name = $_POST['card_name'];
    $card_number = $_POST['card_number'];
    $expiry_date = $_POST['expiry_date'];
    $cvv = $_POST['cvv'];
    $amount = $_POST['amount'];

    // Here, you would process the payment with a payment gateway like Stripe.
    // For this example, we'll assume the payment is successful.
    $payment_status = "successful";
} else {
    // If the form is not submitted yet
    $payment_status = "pending";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Form</title>
</head>
<body>
    <h2>Payment Form</h2>

    <!-- Payment Form -->
    <form action="payment.php" method="POST">
        <label for="card_name">Cardholder Name:</label>
        <input type="text" id="card_name" name="card_name" required><br><br>

        <label for="card_number">Card Number:</label>
        <input type="text" id="card_number" name="card_number" required><br><br>

        <label for="expiry_date">Expiry Date (MM/YY):</label>
        <input type="text" id="expiry_date" name="expiry_date" required><br><br>

        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" required><br><br>

        <label for="amount">Amount ($):</label>
        <input type="text" id="amount" name="amount" value="49.99" disabled><br><br>

        <button type="submit">Submit Payment</button>
    </form>

    <?php if ($_SERVER["REQUEST_METHOD"] == "POST") : ?>
        <h3>Payment Status:</h3>
        <p>Your payment of $<?php echo $amount; ?> was <?php echo $payment_status; ?>.</p>
    <?php endif; ?>
</body>
</html>
