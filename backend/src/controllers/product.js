const express = require('express');
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const authorize = require("../middlewares/authorize");
const product = require("../models/products.model");
const { body, validationResult } = require("express-validator");

router.get('/fetchallproducts', fetchuser, authorize(["Manager", "Admin"]), async (req, res)=>{
    try {
        const products = await product.find().lean().exec();
        res.json(products)
    } catch (error) {
        res.status(500).send("some error occured");
    }
    
   
})

router.post('/addproduct', fetchuser, authorize(["Admin"]), [
    body("title", "enter a valid name").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const product = new product({
            title, description, tag
        })
        
        const savedproduct = await product.save();
        res.json(savedproduct);
    } catch (error) {
        res.status(500).send("some error occured");
    }
    
})


//updating the products request
router.put('/updateproduct/:id', fetchuser, authorize(["Admin"]), async (req, res) => {
    const {title, description, tag} = req.body;
    // Create a newproduct object
    try {
        const newproduct  = {};
        if(title){newproduct.title = title};
        if(description){newproduct.description = description};
        if(tag){newproduct.tag = tag};

        // Find the product to be updated and update it
        let product = await product.findById(req.params.id);
        if(!product){return res.status(404).send("Not Found")}

        

        product = await product.findByIdAndUpdate(req.params.id, {$set: newproduct}, {new:true})
        res.json({product});

    } catch (error) {
        res.status(500).send("some error occured");
    
    }
    
    })


    router.delete('/deleteproduct/:id', fetchuser, authorize(["Admin"]), async (req, res) => {
        const {title, description, tag} = req.body;
    try {
        
    // Find the product to be deleted and delete it
        let product = await product.findById(req.params.id);
        if(!product){return res.status(404).send("Not Found")}


        product = await product.findByIdAndDelete(req.params.id)
        res.json({"success": "product has been deleted"});
    } catch (error) {
        res.status(500).send("some error occured");
    
    }    
    

    })
module.exports = router