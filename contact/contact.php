<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // Email content
  $body = "Name: $name \nEmail: $email \nMessage: $message";

  // Replace with your email address
  $recipient = "faisaluk@icloud.com";

  // Send email using mail function (Might require server configuration)
  if (mail($recipient, "Contact Form Submission", $body)) {
    echo "Thank you for your message! I will get back to you soon.";
  } else {
    echo "There was an error sending your message. Please try again later.";
  }
}
?>
