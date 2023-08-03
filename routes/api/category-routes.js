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

//put -update category by its id value
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, updatedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedRows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
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
