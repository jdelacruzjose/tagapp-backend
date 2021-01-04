const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Transportation = require('../models/transportation-model');


// POST route => to create a new vehicle
router.post('/vehicles', (req, res, next)=>{
  const myVehicleBody = req.body;
 
  Transportation.create(myVehicleBody)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET ALL VEHICLES
router.get("/vehicles", (req, res, next) => {
  Transportation.find()
    .then(allTheVehicles => {
      res.json(allTheVehicles);
    })
    .catch(err => {
      res.json(err)
    });
});

// GET SPECIFIC VEHICLE
router.get("/vehicles/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Transportation.findById(req.params.id) 
  //.populate('User') <------ USER??
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT/EDIT SPECIFIC EVENT
router.put("/vehicles/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Transportation.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `${req.body.model} updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE SPECIFIC EVENT
router.delete("/vehicles/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Transportation.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Vehicle with ${req.body.model} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;