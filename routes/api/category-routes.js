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

// PUT - Update category by its id value
router.put('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id); // Convert the ID to an integer.

    // Check if the ID is a valid number.
    if (isNaN(categoryId) || categoryId <= 0) {
      return res.status(400).json({ message: 'Invalid category Id' });
    }

    // Update the category's name by its `id` value
    const [updatedRowsCount] = await Category.update(
      { category_name: req.body.category_name },
      {
        where: { id: categoryId }, // Use the parsed categoryId in the where clause.
      }
    );

    // Check if any rows were updated.
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Retrieve the updated category from the database again.
    const updatedCategory = await Category.findByPk(categoryId);

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Return the updated category object.
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes.
    res.status(500).json({ message: 'Error updating Category' });
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
