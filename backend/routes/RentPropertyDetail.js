const router = require("express").Router();
let RentPropertyDB = require("../models/RentPropertyDetail.models");

router.route("/").get(async (req, res) => {
  try {
    const { location, property, minPrice, maxPrice } = req.query;
console.log(location,property,minPrice,maxPrice);
    const filter = {};
    if (location) filter.City = location;
    if (property) filter.TypeOfProperty = property;
    if (minPrice) filter.Price = { $gte: minPrice };
    if (maxPrice) filter.Price = { ...filter.Price, $lte: maxPrice };
console.log('filter: ',filter);
    const rentProperties = await RentPropertyDB.find(filter);

    console.log('properties: ',rentProperties);
    res.json(rentProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.route("/property-details-rent/:id").get(function (req, res) {
  const id = req.params.id;
  RentPropertyDB.findById(id, function (err, property) {
    if (!property) {
      return res.json("Property not found :(").end();
    }
    return res.json(property).end();
  });
});

module.exports = router;
