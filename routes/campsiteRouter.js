const express = require("express");
const Campsite = require("../models/campsite");

const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .get((req, res, next) => {
    Campsite.find()
      .then((campsites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsites);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Campsite.create(req.body)
      .then((campsite) => {
        console.log("Campsite Created ", campsite);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
    //res.end(
    //   "Will add campsite: " + req.body.name + "with description" + req.body.description
    // `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    // );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT request not supported on /campsites");
  })
  .delete((req, res, next) => {
    //res.end("Deleting all campsites");
    Campsite.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

campsiteRouter
  .route("/:campsiteId")
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation note supported");
  })
  .put((req, res, next) => {
    Campsite.findByIdAndUpdate(
      req.params.campsiteId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
    //res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    //res.end(`Will update the campsite: ${req.body.name}
    // with description: ${req.body.description}`);
  })
  .delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
    //res.end(`Deleting campsite: ${req.params.campsiteId}`);
  });

module.exports = campsiteRouter;
