const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//const Categories = require('../../models/Category')

//stable - tested >>
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //----Activity 6
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
});

//stable - tested >>
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //----ACTIVITY 6 - finding by primary key - ID
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
});

//Stable - Tested >>
router.post("/", async (req, res) => {
  // create a new category
  // Categories.create({
  //   category_name: res.body.category,
  // });
  try {
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
  } catch (err) {
    res.json(err);
  }
});

//stable-tested >>
router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    req.body,
    //criteria to be matched on
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
});

//stable-tested >>
router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
