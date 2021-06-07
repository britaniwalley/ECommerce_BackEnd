// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

Product.belongsTo(Category, {
  //foreignKey is referencing the model on the left side of the 'belongsTo'
  foreignKey: "category_id",
});

Category.hasMany(Product, {
  //foreignKey is referencing the model on the right side of 'hasMany'
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "product_Tag",
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "tagged_Product",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
