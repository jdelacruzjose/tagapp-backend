const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Shenanigan = require("../models/shenanigan-model");
const Transportation = require("../models/transportation-model");
const Comment = require("../models/comment-model");

// POST NEW EVENT
router.post("/events",  (req, res, next) => {
  const myEventBody = req.body;
  console.log(`shenanigan router post ${myEventBody}`)
  myEventBody.author = req.user._id;

  Shenanigan.create(myEventBody)
    .then(response => {
      console.log("this is the newly created event info ########## ", reponse);
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});



router.post('/events', (req, res,_) =>{
  Shenanigan.create({
    name : req.body.name


    
  })
})




// POST TRANSPORTATION TO EVENT
router.post("/addVehicle/:eventsId", (req, res, next) => {
    const newVehicle = new Transportation(req.body);
    console.log(req.body);
    // res.json(req.body)
    let message = "working"
    res.json(message)
    // newVehicle.owner = req.user._id;
    newVehicle.save()
    .then(newVehicle => {
      console.log("New vehicle added to the Event", newVehicle);
      Shenanigan.findById(req.params.eventsId)
      .then(eventFromDb => {
        console.log("the event from DB when adding new vehicle ------------------", eventFromDb);
        eventFromDb.transportation.push(newVehicle._id);
        eventFromDb.save()
        .then(updatedEvent => {
          console.log("the update event with the new vehicle ------------", updatedEvent);
          // RES REDIRECT BACK ????
        })
      })
    })
})  







//CREATE A COMMENT
router.post("/comments", (req, res, next) => {
  const myCommentBody = req.body;

  Comment.create(myCommentBody)
    .then(response => {
      console.log(
        "this is the newly created comment info ########## ",
        reponse
      );
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET ALL EVENTS
router.get("/events", (req, res, next) => {
  console.log("this is the session", req.session);
  Shenanigan.find()
    .populate("transportation")
    .then(allTheEvents => {
      res.json(allTheEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET SPECIFIC EVENT
router.get("/events/:id", (req, res, next) => {
  console.log("ROUTE CALLED")
  console.log(req.params.id)
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Shenanigan.findById(req.params.id).populate('author', 'firstName lastName')
  .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT/EDIT SPECIFIC EVENT
router.put("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Shenanigan.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Event with ${req.body.eventName} is updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE SPECIFIC EVENT
router.delete("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Shenanigan.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Event with ${req.body.eventName} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
