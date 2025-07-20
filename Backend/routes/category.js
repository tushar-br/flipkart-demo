const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.post('/', async (req, res) => {
   
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.json(category)

})


router.get('/', async(req,res)=>{
    const category = await Category.find();
    res.json(category);
})

module.exports = router;