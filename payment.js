document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // You would typically send this data to your server for processing

    alert('Payment successful! Thank you for your purchase!');
    // Optionally, redirect to a confirmation page or home page
    window.location.href = 'payment.html';
});
