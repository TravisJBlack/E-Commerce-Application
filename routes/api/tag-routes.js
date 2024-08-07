const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { tableName } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{ 
    const tagsData  = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagsData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagCategory = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    res.status(200).json(tagCategory);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag);
    } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const TagUpdate = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((TagUpdate)=> {
    res.status(200).json(TagUpdate);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const destoryTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if(!destoryTag) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }
    res.status(200).json(destoryTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
