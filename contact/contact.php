<?php

// Define the function to handle contact form submission (renamed from the main script)
function helloHttp(ServerRequestInterface $request) {
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if request is coming from AJAX
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
      $name = $_POST['name'];
      $email = $_POST['email'];
      $message = $_POST['message'];

      // Email content
      $body = "Name: $name \nEmail: $email \nMessage: $message";

      // Replace with your email address
      $recipient = "faisaluk@icloud.com";

      if (mail($recipient, "Contact Form Submission", $body)) {
        $response = ['message' => 'Thanks for your message! I will get back to you soon.'];
        echo json_encode($response); // Send JSON response with success message
      } else {
        $response = ['message' => 'There was an error sending your message. Please try again later.'];
        echo json_encode($response); // Send JSON response with error message
      }
    } else {
      // Handle non-AJAX requests (optional, can return a 400 error)
    }
  } else {
    // Handle non-POST requests (optional)
  }
}

// This line is no longer needed as the function is now defined explicitly
// // Register the function with Functions Framework.
// // This enables omitting the `FUNCTIONS_SIGNATURE_TYPE=http` environment
// // variable when deploying.
// FunctionsFramework::http('helloHttp', 'helloHttp');

// This line remains unchanged
// FunctionsFramework::http('helloHttp', 'helloHttp'); (Commented out as not needed anymore)
