const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
//--Stable - Tested >>
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      {
        model: Category,
      },
      {
        model: Tag,
        through: ProductTag,
        as: "product_Tag",
      },
    ],
  }).then((productData) => {
    res.json(productData);
  });
});

// get one product
//----Stable - Tested >>
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findByPk(req.params.id, {
    include: [
      {
        model: Category,
      },
      //as associated value needs to match what is listed in the models index file.
      {
        model: Tag,
        through: ProductTag,
        as: "product_Tag",
      },
    ],
  }).then((productData) => {
    res.json(productData);
  });
});

// create new product
//stable-tested >>
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
//stable-tested >>
router.put("/:id", (req, res) => {
  // update product data
  /* req.body
  {
      "product_name" : "Foobar",
      "price" : 685.00,
      "stock" : 24,
      "tagIds" : [6, 7, 8]
 }
 */
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tagData) => {
    res.json(tagData);
  });

  //----------THIS WAS THE PROVIDED CODE THAT I COULD NOT GET TO WORK-LIKELY BECAUSE OF A LACK OF UNDERSTANDING WHAT EXACTLY IT'S DOING AND HOW I COULD INTERFACE WITH IT----------------//
  // Product.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((product) => {
  //     // find all associated tags from ProductTag
  //     return ProductTag.findAll({ where: { product_id: req.params.id } });
  //   })
  //   .then((productTags) => {
  //     // get list of current tag_ids
  //     const productTagIds = productTags.map(({ tag_id }) => tag_id);
  //     // create filtered list of new tag_ids
  //     const newProductTags = req.body.tagIds
  //       .filter((tag_id) => !productTagIds.includes(tag_id))
  //       .map((tag_id) => {
  //         return {
  //           product_id: req.params.id,
  //           tag_id,
  //         };
  //       });
  //     // figure out which ones to remove
  //     const productTagsToRemove = productTags
  //       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //       .map(({ id }) => id);

  //     // run both actions
  //     return Promise.all([
  //       ProductTag.destroy({ where: { id: productTagsToRemove } }),
  //       ProductTag.bulkCreate(newProductTags),
  //     ]);
  //   })
  //   .then((updatedProductTags) => res.json(updatedProductTags))
  //   .catch((err) => {
  //     // console.log(err);
  //     res.status(400).json(err);
  //   });
});

//stable-tested >>
router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((productData) => {
      res.json(productData);
    })
    .catch((err) => res.json(err));
});

module.exports = router;