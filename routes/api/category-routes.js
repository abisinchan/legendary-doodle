const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get - find all
router.get('/', async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.findAll({
      // Include associated Products
      include: [Product],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get -find one by id value
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      // Include associated Products
      include: [Product],
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post -create new category
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      // find the updated product
      return Product.findByPk(req.params.id);
    })
    .then((updatedProduct) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } })
        .then((productTags) => {
          // get list of current tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          // create filtered list of new tag_ids
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });
          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
            updatedProduct, // include the updated product in the Promise.all response
          ]);
        });
    })
    .then((results) => {
      const updatedProduct = results.pop(); // The updated product is the last item in the results array
      res.json({ product: updatedProduct, tags: results }); // Respond with the updated product and associated tags
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


//delete -delete by id value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: { 
        id: req.params.id 
      },
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
