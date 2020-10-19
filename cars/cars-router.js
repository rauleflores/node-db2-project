const express = require("express");
const db = require("../data/config");

const router = express.Router();

router.get("//", (req, res) => {
  res.status(200).json({
    message: "Hello from cars-router.js!",
  });
});

router.get("/cars", async (req, res, next) => {
  try {
    res.json(await db("cars"));
  } catch (err) {
    next(err);
  }
});

router.get("/cars/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await db("cars").where({ id }).first();
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

router.post("/cars", async (req, res, next) => {
  try {
    const [id] = await db("cars").insert(req.body);
    res.status(201).json(await getCarByID(id));
  } catch (err) {
    next(err);
  }
});

router.delete("/cars/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const num = await db("cars").where({ id }).del();
    res.status(200).json({
      message: `${num} file(s) successfully removed.`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/cars/:id", async (req, res, next) => {
  try {
    const payload = {
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      titleStatus: req.body.titleStatus,
      transmission: req.body.transmission,
    };
    if (!payload.transmission || !payload.titleStatus || !payload.mileage) {
      return res.status(400).json({
        errorMessage:
          "Please provide an update for the transmission, title status and mileage",
      });
    }
    const { id } = req.params;
    await db("cars").where("id", id).update(payload);
    res.status(200).json(await getCarByID({ id }));
  } catch (err) {
    next(err);
  }
});

function getCarByID(id) {
  return db.first().from("cars").where("id", id);
}

module.exports = router;
