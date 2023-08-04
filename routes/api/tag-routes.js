const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include their associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = parseInt(req.params.id); // Convert the ID to an integer.

    // Check if the ID is a valid number.
    if (isNaN(tagId) || tagId <= 0) {
      return res.status(400).json({ message: 'Invalid tag ID' });
    }

    // Update the tag's name by its `id` value
    const [updatedRowsCount] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: tagId }, // Use the parsed tagId in the where clause.
      }
    );

    // Check if any rows were updated.
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Retrieve the updated tag from the database again.
    const updatedTag = await Tag.findByPk(tagId);

    if (!updatedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Return the updated tag object.
    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes.
    res.status(500).json({ message: 'Error updating tag' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Delete one tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
