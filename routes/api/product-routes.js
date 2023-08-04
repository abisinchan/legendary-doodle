const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // Find all products and include their associated Category and Tag data
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its `id` and include its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    const product = await Product.create(req.body);

    // if there are product tags, create pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update product
router.put('/:id', async (req, res) => {
  try {
    // Check if the product exists before updating
    const existingProduct = await Product.findByPk(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product data
    const updatedRowsCount = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRowsCount[0] === 0) {
      return res.status(400).json({ message: 'Failed to update product' });
    }

    // If there are tagIds in the request body, update the associated tags in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create a filtered list of current tag_ids and new tag_ids
      const currentTagIds = productTags.map(({ tag_id }) => tag_id);
      const newTagIds = req.body.tagIds.filter((tag_id) => !currentTagIds.includes(tag_id));

      // Create newProductTags for new tag_ids
      const newProductTags = newTagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

      // Find product tags to remove
      const productTagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id));
      const productTagsToRemoveIds = productTagsToRemove.map(({ id }) => id);

      // Run both actions (remove and create new product tags)
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemoveIds } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Fetch the updated product after the update is done
    const updatedProduct = await Product.findByPk(req.params.id);

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { 
        id: req.params.id 
      },
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;