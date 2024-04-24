const router = require("express").Router();
let SalePropertyDB = require("../models/SalePropertyDetail.models");

router.route("/").get( async (req, res) => {
  try {
    const { location, property, minPrice, maxPrice } = req.query;
console.log(location,property,minPrice,maxPrice);
    const filter = {};
    if (location) filter.City = location;
    if (property) filter.TypeOfProperty = property;
    if (minPrice) filter.Price = { $gte: minPrice };
    if (maxPrice) filter.Price = { ...filter.Price, $lte: maxPrice };
console.log('filter: ',filter);
    const saleProperties = await SalePropertyDB.find(filter);

    console.log('properties: ',saleProperties);
    res.json(saleProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.route("/property-details-sale/:id").get(function (req, res) {
  const id = req.params.id;
  SalePropertyDB.findById(id, function (err, property) {
    if (!property) {
      return res.json("Property not found :(").end();
    }
    return res.json(property).end();
  });
});

module.exports = router;
