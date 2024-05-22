const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{ 
    const categoriesData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoriesData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    res.status(200).json(singleCategory);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory);
    } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((category)=> {
    
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const destoryCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if(!destoryCategory) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }
    res.status(200).json(destoryCategory);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
