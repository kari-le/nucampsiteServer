const express = require("express");
const promotionRouter = express.Router();

promotionRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all promotions to you");
  })
  .post((req, res) => {
    res.end(
      //   "Will add promotion: " + req.body.name + "with description" + req.body.description
      `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT request not supported on /promotions");
  })
  .delete((req, res) => {
    res.end(" Deleting all promotions");
  });

promotionRouter
  .route("/:promotionId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send details of promotion ${req.params.promotionId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation note supported");
  })
  .put((req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}`);
    // eventually will update unique promotion in database
    res.end(
      `Will update the promotion name to: ${req.body.name} and the description to: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    // eventually will delete this promotion in database
    res.end(`Deleting promotion: ${req.params.promotionId}`);
  });

module.exports = promotionRouter;
