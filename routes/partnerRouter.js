const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all partners to you");
  })
  .post((req, res) => {
    res.end(
      //   "Will add partner: " + req.body.name + "with description" + req.body.description
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT request not supported on /partners");
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });

partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send details of partner ${req.params.partnerId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation note supported");
  })
  .put((req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}`);
    // eventually will update unique partner in database
    res.end(
      ` Will update the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    // eventually will delete this partner in database
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

// Test: Use Postman to test each of your newly created endpoints and verify that you receive the expected responses.
// Test GET/POST/PUT/DELETE requests to: localhost:3000/partners/1
// You do not have to use /1. You could just as well use /23, or /foo, or any other string in its place.
// For the PUT request, make sure to send a JSON string in the body of the request with a name and description, the same way you did in the exercises.

module.exports = partnerRouter;
