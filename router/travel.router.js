const express = require("express");
const { TravelModel } = require("../model/travel.model");

const travelRouter = express.Router();

travelRouter.post("/add", async (req, res) => {
  try {
    const data = new TravelModel(req.body);
    await data.save();
    res.status(200).json({ msg: "Added successfuly!", isError: false });
  } catch (error) {
    res.status(400).json({ isError: true, msg: error.message });
  }
});

travelRouter.get("/", async (req, res) => {
  try {
    let { sort, filter } = req.query;
    if (sort && filter) {
      let sortby = sort == "asc" ? 1 : -1;
      let data = await TravelModel.find({ destination: `${filter}` }).sort({
        budget: `${sortby}`,
      });
      return res.status(200).send({ isError: false, data: data });
    }
    if (sort) {
      let sortby = sort == "asc" ? 1 : -1;
      let data = await TravelModel.find().sort({ budget: `${sortby}` });
      return res.status(200).send({ isError: false, data: data });
    }
    if (filter) {
      let data = await TravelModel.find({ destination: `${filter}` });
      return res.status(200).send({ isError: false, data: data });
    }
    let data = await TravelModel.find();
    res.status(200).send({ isError: false, data: data });
  } catch (error) {
    res.status(400).json({ isError: true, msg: error.message });
  }
});

travelRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const data = await TravelModel.findByIdAndDelete(id);
    if (data) {
      res.status(200).send({ msg: "data deleted", isError: false });
    } else {
      res.status(200).send({ msg: "id not found", isError: false });
    }
  } catch (error) {
    res.status(400).json({ isError: true, msg: error.message });
  }
});
module.exports = { travelRouter };
