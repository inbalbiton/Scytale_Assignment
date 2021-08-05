var express = require("express");
var router = express.Router();
const utils = require("./DBUtils");


// Request to add a new Pull Request to Server
router.post("/newpr", async (req, res, next) => {
  try {
    const newPrNum = await utils.NextPrNumber();
    let pr = {
        PR_Number: newPrNum,
        Title: req.body.title,
        Description: req.body.description,
        Author: req.body.author,
        Status: req.body.status,
        Labels: req.body.labels,
        Creation_Date: Date.now(),
      };
      const result = await utils.AddNewPullRequest(pr);
      if (result.acknowledged)
        res.status(201).send({ message: "New Pull Request Created", success: true });
      else {
        res.status(500).send("Something Went Wrong");
      }
  } catch (error) {
    next(error);
  }
});

//Request to get all the Pull Request in Server - with some Filters and sorting options
router.get("/all", async (req, res, next) => {
  try {
    const { status, labels, sorted, order } = req.query;
    let filters = [];
    if(status != ''){
      filters.push({"Status":{"$in": status.split(',')}});
    }
    if(labels != ''){
      filters.push({"Labels":{"$in": labels.split(',')}});
    }
    await utils.GetAllPullRequests(filters, sorted, order).then(allPrs => {
      res.status(200).send(allPrs);
    })
    
  } catch (error) {
    next(error);
  }
});

// Request to Get all the Unique type of Status in the server - to filter with them.
router.get("/allStatus", async (req, res, next) => {
  try {
    const allStstus = await utils.GetAllStatusDistinct();
    res.status(200).send(allStstus);
  } catch (error) {
    next(error);
  }
});

// Request to Get all the Unique type of Labels in the server - to filter with them.
router.get("/allLabels", async (req, res) => {
  try {
    const allLabels = await utils.GetAllLabelsDistinct();
    res.status(200).send(allLabels);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
