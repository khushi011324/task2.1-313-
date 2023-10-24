const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js"); // Import the Mailgun library

const app = express();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Define a route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Initialize Mailgun with your API key and domain
var api_key = "8a163a3d6ee8cd3620708060ae86f79d-28e9457d-f3e54c59";
var domain = "sandbox389cd9806e1a4da094c84eba3a148591.mailgun.org";
var mg = mailgun({ apiKey: api_key, domain: domain });

var data = {
  from: "Tanya <tanya4849.be22@chitkara.edu.in>",
  to: "tanya4849.be22@chitkara.edu.in",
  subject: "Heyyyy",
  text: "Welcome new Subscriber",
};

// Define a route to handle POST requests
app.post("/", (req, res) => {
  // Log the email data and the request body
  console.log("Email Data:", data);
  console.log("Request Body:", req.body);

  // Send the email using Mailgun
  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent successfully:", body);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the Express server
const port = 5050; // Define the port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
